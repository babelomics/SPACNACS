import OpencgaCommon from "./OpencgaCommon";

class OpencgaIndividualClient {

    ADD_SAMPLE = 'addSample';


    constructor(opencga) {
        this.opencga = opencga;
    }

    static translateResumenSampleFromServer(sample) {
        return {
            id: sample.id,
            name: sample.name,
            description: sample.description,
        };
    }

    static translateIndividualFromServer(userId, projectId, studyId, individual) {
        const res = {
            id: individual.id,
            name: individual.name,
            description: individual.description,
            phenotypes: individual.phenotypes || [],
            ethnicity: individual.ethnicity,
            sex: individual.sex,
            karyotypicSex: individual.karyotypicSex,
            samples: !!individual.samples ?
                individual.samples.map(sample => OpencgaIndividualClient.translateResumenSampleFromServer(sample)) : []
        };
        if (!!individual.creationDate) {
            res.creationDate = OpencgaCommon.parseOpencgaDate(individual.creationDate);
        }
        if (!!individual.modificationDate) {
            res.modificationDate = OpencgaCommon.parseOpencgaDate(individual.modificationDate);
        }
        if (!!individual.dateOfBirth) {
            res.dateOfBirth = OpencgaCommon.parseOpencgaDate(individual.dateOfBirth);
        }
        return res;
    }


    fetchIndividualsInfo(userId, projectId, studyId, individual) {
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
            const fieldsToInclude = [
                'samples',
            ];

            const includeParam = encodeURIComponent(fieldsToInclude.join(','));


            // TODO: 1.4.2
            //const url = `${this.opencga.url}/v${this.opencga.majorVersion}/individuals/${individualParam}/info?include=${includeParam}`;
            // TODO: 1.3.8
            const url = `${this.opencga.url}/v${this.opencga.majorVersion}/individuals/${individual.id}/info`;
            //`?include=${includeParam}`;

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
                        // return sort creationDate
                        return individuals.map(individual => OpencgaIndividualClient.translateIndividualFromServer(userId, projectId, studyId, individual)).sort((a, b) => (a.creationDate > b.creationDate) ? -1 : 1);
                    } else {
                        throw error || "unknown-error";
                    }
                });
        } else {
            return Promise.reject('no-session');
        }
    }


    fetchIndividuals(userId, projectId, studyId, page, pageSize) {
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
            const individualParam = encodeURIComponent(`${individualId}`);
            const fieldsToInclude = [
                'name',
              //  'description'
            ];

            const includeParam = encodeURIComponent(fieldsToInclude.join(','));
*/

            const skipParam = page * pageSize;
            const limitParam = encodeURIComponent(pageSize);
            const queryStrings = [
                `study=${studyId}`,
                `skip=${skipParam}`,
                `limit=${limitParam}`,
                `count=false`,
                //`exclude=${encodeURIComponent("annotation.geneExpression")}`,
                `includeIndividual=true`,
                "sort=true",

            ];

            // TODO: 1.4.2
            //const url = `${this.opencga.url}/v${this.opencga.majorVersion}/individuals/${individualParam}/info?include=${includeParam}`;
            // TODO: 1.3.8
            const url = `${this.opencga.url}/v${this.opencga.majorVersion}/individuals/search?${queryStrings.join("&")}`;

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
                        // return sort creationDate
                        return individuals.map(individual => OpencgaIndividualClient.translateIndividualFromServer(userId, projectId, studyId, individual)).sort((a, b) => (a.creationDate > b.creationDate) ? -1 : 1);
                    } else {
                        throw error || "unknown-error";
                    }
                });
        } else {
            return Promise.reject('no-session');
        }
    }

    fetchSave(userId, individual) {
        if (!!this.opencga && !!this.opencga.session.getToken(userId) && !!userId) {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.opencga.sessionToken}`,
            };

            //let temp = translateProyectToServer(userId, project);
            let newIndividual = {
                sex: individual.sex,
                ethnicity: individual.ethnicity,
                karyotypicSex: individual.karyotypicSex,
                dateOfBirth: individual.dateOfBirth,
                phenotypes: individual.phenotypes,
                //stats: {},
                //attributes:{}
            };

            if (!individual.id) {
                newIndividual.name = !!individual.name ? individual.name.replace(/ /g, '_') : individual.name;
            } else {
                if (individual.name !== individual.nameOld && individual.nameOld)
                    newIndividual.name = !!individual.name ? individual.name.replace(/ /g, '_') : individual.name;
            }

            if (!!individual.samples){
                if (individual.samples.length > 0) {
                    newIndividual.samples = [];
                    individual.samples.forEach(i => newIndividual.samples.push(i.id));
                }
            }
            const bodyParams = JSON.stringify(newIndividual);

            const params = {
                method: 'POST',
                headers: headers,
                body: bodyParams
            };

            // TODO: 1.4.2
            // TODO: 1.3.8
            let studyId = "";
            let projectId = "";
            const url = !!individual && !!individual.id ? `${this.opencga.url}/v${this.opencga.majorVersion}/individuals/${individual.id}/update` :
                `${this.opencga.url}/v${this.opencga.majorVersion}/individuals/create?study=${studyId}`;

            return fetch(url, params)
                .then(response => response.json(), error => error.message || 'unknown error')
                .then(res => {
                    const error = !!res && res.error;
                    const individual = !!res
                        && !!res.response
                        && 1 === res.response.length
                        && !!res.response[0]
                        && !!res.response[0].result
                        && res.response[0].result[0];
                    if (!!individual && !error) {
                        return OpencgaIndividualClient.translateIndividualFromServer(userId, projectId, studyId, individual);
                    } else {
                        throw new Error(error || "unknown-error");
                    }
                });
        } else {
            return Promise.reject('no-session');
        }
    }



}

export default OpencgaIndividualClient;