import OpencgaCommon from "./OpencgaCommon";

class OpencgaSampleClient {

    constructor(opencga) {
        this.opencga = opencga;
    }


    static translateIndividualFromServer(userId, studyId, analysisId, samplesId, individual) {

        return {
            name: individual.name,
            samples: individual.samples || []
        };
    }

    static translateSampleFromServer(userId, projectId, studyId, sample) {
        return {
            id: sample.id,
            name: sample.name,
            description: sample.description,
            individual: !!sample && sample.individual,
            creationDate: OpencgaCommon.parseOpencgaDate(sample.creationDate),
        };
    }


    fetchSamples(userId, projectId, studyId, page, pageSize) {
        if(!!this.opencga && !!this.opencga.session.getToken(userId) )
            this.opencga.sessionToken = sessionStorage.getItem('prioCNVscookie');
        if (!!this.opencga && !!this.opencga.sessionToken && !!userId) {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.opencga.sessionToken}`,
            };
            const params = {
                method: 'GET',
                headers: headers,
            };
            /*
            const sampleParam = encodeURIComponent(`${sampleId}`);
            const fieldsToInclude = [
                'name',
              //  'description'
            ];

            const includeParam = encodeURIComponent(fieldsToInclude.join(','));
*/
            // const page = 0;
            let queryStrings = [];

            if (page != undefined){
                const skipParam = encodeURIComponent(page * pageSize);
                const limitParam = encodeURIComponent(pageSize);
                queryStrings = [
                    `study=${studyId}`,
                    `skip=${skipParam}`,
                    `limit=${limitParam}`,
                    `count=false`,
                    //`exclude=${encodeURIComponent("annotation.geneExpression")}`,
                    `includeIndividual=true`,
                    "sort=true",

                ];
            } else {
                 queryStrings = [
                    `study=${studyId}`,
                    `count=false`,
                    //`exclude=${encodeURIComponent("annotation.geneExpression")}`,
                    `includeIndividual=true`,
                    "sort=true",
                ];
            }

            // TODO: 1.4.2
            //const url = `${this.opencga.url}/v${this.opencga.majorVersion}/samples/${sampleParam}/info?include=${includeParam}`;
            // TODO: 1.3.8
            const url = `${this.opencga.url}/v${this.opencga.majorVersion}/samples/search?${queryStrings.join("&")}`;

            // http://localhost:9090/opencga-1.3.8/webservices/rest/v1/individuals/search?sid=&study=2&samples=26,5
            return fetch(url, params)
                .then(response => response.json(), error => error.message || 'unknown error')
                .then(res => {
                    const error = !!res && res.error;
                    const samples = !!res
                        && !!res.response
                        && 1 === res.response.length
                        && !!res.response[0]
                        && res.response[0].result;

                    if (!!samples && !error) {
                        return samples.map(sample => OpencgaSampleClient.translateSampleFromServer(userId, projectId, studyId, sample));
                    } else {
                        throw error || "unknown-error";
                    }
                });
        } else {
            return Promise.reject('no-session');
        }
    }

    fetchSave(userId, projectId, studyId, sample) {
        if (!!this.opencga && !!this.opencga.session.getToken(userId) && !!userId) {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.opencga.sessionToken}`,
            };

            //let temp = translateProyectToServer(userId, project);
            let newSample = {
                //description: sample.description,
                //type: sample.type,
                //somatic:sample.somatic,
                stats: {},
                attributes: {}
            };
            /*
            if (!!sample) {
                newSample.name = sample.name;
                if (!!sample.description)
                    newSample["description"] = sample["description"];

                /*if (!!sample.individual && !!sample.individual.id) {
                    if (newSample["individual"] == undefined)
                        newSample["individual"] = {};
                    newSample["individual"]["id"] = sample.individual.id;
                }*
               // if (!!sample.individual && !!sample.individual.id)
                //    newSample.individualId = sample.individual.id;

                if (sample.id != undefined)
                    newSample.id = sample.id;
            }*/

            newSample.name = !!sample.name ? sample.name.replace(/ /g, '_'): sample.name;

            if (!!sample.description)
                newSample["description"] = sample["description"];

            if (sample.id != undefined)
                newSample.id = sample.id;

            const bodyParams = JSON.stringify(newSample);

            const params = {
                method: 'POST',
                headers: headers,
                body: bodyParams
            };

            const queryStrings = [
                `study=${studyId}`
            ];

           // if (!!newSample.individual && !!newSample.individual.id)
             //   queryStrings.push(`individualId=${newSample.individual.id}`);

            // TODO: 1.4.2
            // TODO: 1.3.8
            const url = !!sample && !!sample.id ? `${this.opencga.url}/v${this.opencga.majorVersion}/samples/${sample.id}/update` :
                `${this.opencga.url}/v${this.opencga.majorVersion}/samples/create?${queryStrings.join("&")}`;

            return fetch(url, params)
                .then(response => response.json(), error => error.message || 'unknown error')
                .then(res => {
                    const error = !!res && res.error;
                    const sample = !!res
                        && !!res.response
                        && 1 === res.response.length
                        && !!res.response[0]
                        && !!res.response[0].result
                        && res.response[0].result[0];
                    if (!!sample && !error) {
                        return OpencgaSampleClient.translateSampleFromServer(userId, projectId, studyId, sample);
                    } else {
                        throw new Error(error || "unknown-error");
                    }
                });
        } else {
            return Promise.reject('no-session');
        }
    }


    fetchIndividualName(userId, projectId, studyId, analysisId, samplesId) {
        if (!!this.opencga && !!this.opencga.session.getToken(userId) && !!userId) {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.opencga.sessionToken}`,
            };
            const params = {
                method: 'GET',
                headers: headers,
            };
            /*
            const sampleParam = encodeURIComponent(`${sampleId}`);
            const fieldsToInclude = [
                'name',
              //  'description'
            ];

            const includeParam = encodeURIComponent(fieldsToInclude.join(','));
*/
            //const skipParam = encodeURIComponent(page * pageSize);
            //const limitParam = encodeURIComponent(pageSize);
            /*const queryStrings = [
                `skip=${skipParam}`,
                `limit=${limitParam}`,
                `count=false`,
                `exclude=${encodeURIComponent("annotation.geneExpression")}`,
                "sort=true",
            ];*/
            const samplesIdParam = encodeURIComponent(samplesId.join(','));
            const queryStrings = [
                `study=${studyId}`,
                `samples=${samplesIdParam}`,
            ];


            // TODO: 1.4.2
            //const url = `${this.opencga.url}/v${this.opencga.majorVersion}/samples/${sampleParam}/info?include=${includeParam}`;
            // TODO: 1.3.8
            //http://localhost:9090/opencga-1.3.8/webservices/rest/v1/samples/5/info?sid=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJteWlkIiwiYXVkIjoiT3BlbkNHQSB1c2VycyIsImlhdCI6MTU1NjIwMjYwMywiZXhwIjoxNTU2MjA2MjAzfQ.EPW3ulIckJF3HhaQhQYtO_KAGuBpYwVFqmO9E91Exb4&allVersions=false&silent=false&includeIndividual=false
            //const url = `${this.opencga.url}/v${this.opencga.majorVersion}/samples/${sampleParam}/info?include=${includeParam}`;
            const url = `${this.opencga.url}/v${this.opencga.majorVersion}/individuals/search?${queryStrings.join("&")}`;

            // http://localhost:9090/opencga-1.3.8/webservices/rest/v1/individuals/search?sid=&study=2&samples=26,5
            return fetch(url, params)
                .then(response => response.json(), error => error.message || 'unknown error')
                .then(res => {

                    const error = !!res && res.error;
                    const individuals = !!res
                        && !!res.response
                        && 1 === res.response.length
                        && !!res.response[0]
                        && res.response[0].result;

                    if (!!individuals && !error) {
                        return individuals.map(individual => OpencgaSampleClient.translateIndividualFromServer(userId, studyId, analysisId, samplesId, individual));
                    } else {
                        throw error || "unknown-error";
                    }
                });
        } else {
            return Promise.reject('no-session');
        }
    }

}

export default OpencgaSampleClient;