import CNVsCommonClient from "./CNVsCommonClient";

import OpencgaIndividualClient from "../opencga/OpencgaIndividualClient";
import CNVFileClient from "./CNVsFileClient";
import Client from "./../Client";

class CNVsIndividualClient {

    constructor(parent) {
        this.parent = parent;
    }


    static translateFromServer(userId, individual) {
        let an =
            {
                ...individual,
                userId: userId
            };
        if (!!individual && !!individual.creationDate)
            an.creationDate = CNVsCommonClient.parseCommonDate(individual.creationDate);

        if (!!individual && !!individual.lastModified)
            an.lastModified = CNVsCommonClient.parseCommonDate(individual.lastModified);

        return an;
    }
/*
    fetchIndividualsSample(userId, projectId, studyId, page, pageSize) {
        let individuals = Client.instance.individual.fetchIndividuals(userId, projectId, studyId, page, pageSize)
            .then(individuals => individuals.map(individual => {
                    let result = {
                        listSamplesId: [],
                        individual: individual
                    };


                    if (!!individual.samples) {
                        individual.samples.forEach(sId => {
                            result.listSamplesId.push(sId.id)
                        });
                    }
                    return result;
                }

            )).then(result => {
                    console.log(result);
                    result.samples = Client.instance.file.fetchData(userId, projectId, studyId, result.listSamplesId[0], undefined, undefined)
                    return result
                }
            ).then(result =>{
                console.log("ultimo");
                console.log(result);

                return result.individuals;
            });


        return individuals;
    }


*/



    static translateFromServerIndividualSample(userId, projectId, studyId, result) {
        let listSamplesId = [];
        let listSamples = [];

        if (!!result.individual.samples) {
            let newSamples = [];
            result.individual.samples.forEach( sId => {
                let sIndiv = sId;
                let sampleSearch = Client.instance.file.fetchData(userId, projectId, studyId, sId.id, undefined, undefined).then(

                    file => {
                        sIndiv.nameFile = file.nameFile;
                        sIndiv.technology = file.technology;
                        sIndiv.scopeTechnology = file.scopeTechnology;
                        sIndiv.detectiont = file.detectiont;
                        newSamples.push(sIndiv);
                    }
                );
                listSamples.push(newSamples);
            });
        }

        if (!!result.individual.samples) {
            let newSamples = [];
            result.individual.samples.forEach(sIndiv => {
                let index = listSamples.findIndex(s => s.sampleId == sIndiv.id);
                if (index != -1) {
                    sIndiv.nameFile = listSamples[index].nameFile;
                    sIndiv.technology = listSamples[index].technology;
                    sIndiv.scopeTechnology = listSamples[index].scopeTechnology;
                    sIndiv.detectiont = listSamples[index].detectiont;
                    newSamples.push(sIndiv);
                }
            });
            result.individual.samples = newSamples;
        }

        return result.individual;
    }

    fetchIndividualsPage(userId, pageFilters, filters, abortSignal) {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.parent.session.getToken(userId)}`,
        };
        const params = {
            method: 'GET',
            headers: headers,
            signal: abortSignal,
        };
        if ( !!this.parent.session.getToken(userId)  && !!userId) {

            const queryStrings = CNVsCommonClient.getQuerString(userId, pageFilters, filters);

            const url = `${this.parent.cnvsUrl}/individual/search?${queryStrings.join("&")}`;

            return fetch(url, params).then(response => {
                if (200 === response.status && !!response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.statusText)
                }
            }).then(analyses =>
                analyses.result.map(individual =>
                    CNVsIndividualClient.translateFromServer(userId, individual)).sort((a, b) => (a.creationDate != undefined && a.creationDate > b.creationDate) ? -1 : 1)
            );
        } else {
            return Promise.reject("no-session");
        }
    }

    fetchSave(userId, individual, abortSignal) {
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${this.parent.session.getToken(userId)}`,
        };

        if (!!this.parent.session.getToken(userId) && !!userId) {
            const bodyParams = new URLSearchParams();


            if (!!individual && !!individual.name)
                bodyParams.set("name", individual.name);

            if (!!individual && !!individual.tags) {
                bodyParams.append("tags",  JSON.stringify(individual.tags));
            }

            if (!!individual && !!individual.description)
                bodyParams.set("description", individual.description);

            if (!!individual && !!individual.sex)
                bodyParams.set("sex", individual.sex);
            if (!!individual && !!individual.ethnicity)
                bodyParams.set("ethnicity", individual.ethnicity);

            if (!!individual && !!individual.karyotypicSex)
                bodyParams.set("karyotypicSex", individual.karyotypicSex);

            if (!!individual && !!individual.dateOfBirth)
                bodyParams.set("dateOfBirth", individual.dateOfBirth);

            if (!!individual && !!individual.phenotypes)
                bodyParams.append("phenotypes",  JSON.stringify(individual.phenotypes));

            if (!!individual.samples){
                let newIndividual = [];
                if (individual.samples.length > 0) {
                    individual.samples.forEach(is => newIndividual.push(is.id));
                }
                bodyParams.append("samples",  JSON.stringify(newIndividual));
            }


            let queryStrings = [
                `userId=${userId}`
            ];

            const params = {
                method: 'POST',
                headers: headers,
                body: bodyParams,
                signal: abortSignal,
            };


            const url = !!individual && !!individual.id ? `${this.parent.cnvsUrl}/individual/update/${individual.id}?${queryStrings.join("&")}` :
                `${this.parent.cnvsUrl}/individual/create?${queryStrings.join("&")}`;

            return fetch(url, params).then(response => {
                if (200 === response.status && !!response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText)
                }
            }).then(individual => {
                return CNVsIndividualClient.translateFromServer(userId, (!!individual && !!individual.result) && ((individual.result.length > 0 && individual.result[0]) || {}))
            });

        } else {
            return Promise.reject("no-session");
        }

    }


    fetchDelete(userId, individual, abortSignal) {
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${this.parent.session.getToken(userId)}`,
        };

        if (!!this.parent.session.getToken(userId) && !!userId) {
            const params = {
                method: 'GET',
                headers: headers,
                //body: bodyParams,
                signal: abortSignal,
            };

            let queryStrings = [
                `userId=${userId}`,
                `idIndividual=${individual.id}`
            ];

            const url =  `${this.parent.cnvsUrl}/individual/delete/${individual.id}?${queryStrings.join("&")}` ;

            return fetch(url, params).then(response => {
                if (200 === response.status && !!response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText)
                }
            }).then(individual => {
                return (!!individual && !!individual.result) && ((individual.result.length > 0 && individual.result[0]) || {});
            });

        } else {
            return Promise.reject("no-session");
        }

    }

}
/*
 let listSamplesId = [];
 let listSamples = [];
 individuals.forEach(ind =>{
     if (!ind.samples) {
             ind.samples(s => listSamplesId.push(s.id));
         }
     }
 );
console.log(listSamplesId);
if (listSamplesId.length > 0) {
  for (let i = 0; i <= listSamplesId.length; i++) {
      let sampleSearch = CNVFileClient.fetchData(userId, projectId, studyId, listSamplesId[i], undefined, undefined)
      listSamples.push(sampleSearch);
  }
}
  individuals.forEach(ind => {
          if (!ind.samples) {

              ind.samples(sIndiv => {
                  let index = listSamples.findIndex(s => s.sampleId == sIndiv.id);
                  if (index != -1) {
                      sIndiv.nameFile = listSamples[index].nameFile;
                      sIndiv.technology = listSamples[index].technology;
                      sIndiv.scopeTechnology = listSamples[index].scopeTechnology;
                      sIndiv.detectiont = listSamples[index].detectiont;
                  }
              });
          }
      }
  );



}
}
*/


export default CNVsIndividualClient;