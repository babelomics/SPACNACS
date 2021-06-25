import OpencgaUserClient from "./OpencgaUserClient";
import OpencgaCommon from './OpencgaCommon';

class OpencgaProjectClient {
	static fromServer(userId, opencgaProject) {
        return {
            userId: userId,
            id: opencgaProject.id,
			name: opencgaProject.name,
			creationDate: OpencgaCommon.parseOpencgaDate(opencgaProject.creationDate),
			description: opencgaProject.description,
			organism: { scientificName: opencgaProject.organism.scientificName, assembly: opencgaProject.organism.assembly }
        };
	}

	static translateStudyFromServer(userId, projectId, study) {
		return {
			userId: userId,
			projectId: projectId,
			id: study.id,
			name: study.name,
			alias: study.alias,
			type: study.type,
			creationDate: OpencgaCommon.parseOpencgaDate(study.creationDate),
			description: study.description,
			attributes: study.attributes,
		};
	}

    constructor(opencga) {
        this.opencga = opencga;
    }

	fetchData(userId, projectId) {
        if (!!this.opencga && !!this.opencga.session.getToken(userId)  && !!projectId) {
            //if (!!this.opencga && !!this.opencga.sessionToken && !!userId && !!projectId) {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.opencga.sessionToken}`,
            };
            const params = {
                method: 'GET',
                headers: headers,
            };
			// const projectIdParam = encodeURIComponent(`${userId}@${projectId}`);
			const fieldsToInclude = [
				'id',
				'name',
				'creationDate',
				'modificationDate',
				'description',
				//'organization',
				'organism',
				'currentRelease',
			];
			const fieldsToExclude = [
				'studies',
			];
			const includeParam = encodeURIComponent(fieldsToInclude.join(','));
			const excludeParam = encodeURIComponent(fieldsToExclude.join(','));
            // TODO: 1.4.2
			// const url = `${this.opencga.url}/v${this.opencga.majorVersion}/projects/${projectIdParam}/info?include=${includeParam}&exclude=${excludeParam}`;
            // TODO: 1.3.8
			const url =   `${this.opencga.url}/v${this.opencga.majorVersion}/projects/${projectId}/info?include=${includeParam}&exclude=${excludeParam}`;

            return fetch(url, params)
                .then(response => response.json(), error => error.message || 'unknown error')
                .then(res => {
                    const error = !!res && res.error;
                    const project = !!res
                        && !!res.response
                        && 1 === res.response.length
                        && !!res.response[0]
                        && !!res.response[0].result
                        && 1 === res.response[0].result.length
                        && res.response[0].result[0];
                    if (!!project && !error) {
                        return OpencgaProjectClient.fromServer(userId, project);
                    } else {
                        throw new Error(error || "unknown-error");
                    }
                });
        } else {
            return Promise.reject('no-session');
        }
	}

	fetchStudies(userId, projectId) {
        if (!!this.opencga && !!this.opencga.session.getToken(userId)  && !!projectId) {

//            if (!!this.opencga && !!this.opencga.sessionToken && !!userId && !!projectId) {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.opencga.sessionToken}`,
            };
            const params = {
                method: 'GET',
                headers: headers,
            };
			// const projectIdParam = encodeURIComponent(`${userId}@${projectId}`);
			const fieldsToInclude = [
				'id',
				'name',
				'alias',
				'type',
				'creationDate',
				'description',
				'attributes',
			];
			const fieldsToExclude = [
				'fqn',
				'modificationDate',
				'status',
				'size',
				'groups',
				'files',
				'jobs',
				'individuals',
				'samples',
				'cohorts',
				'panels',
				'variableSets',
				'permissionRules',
				'uri',
				'stats',
			];
			const includeParam = encodeURIComponent(fieldsToInclude.join(','));
			const excludeParam = encodeURIComponent(fieldsToExclude.join(','));
			// TODO: 1.4.2
            //const url = `${this.opencga.url}/v${this.opencga.majorVersion}/projects/${projectIdParam}/studies?include=${includeParam}&exclude=${excludeParam}`;
			// TODO: 1.3.8
            //http://localhost:9090/opencga-1.3.8/webservices/rest/v1/projects/1/studies?sid=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJteWlkIiwiYXVkIjoiT3BlbkNHQSB1c2VycyIsImlhdCI6MTU1NjIwMjYwMywiZXhwIjoxNTU2MjA2MjAzfQ.EPW3ulIckJF3HhaQhQYtO_KAGuBpYwVFqmO9E91Exb4&silent=false
			const url = `${this.opencga.url}/v${this.opencga.majorVersion}/projects/${projectId}/studies?include=${includeParam}&exclude=${excludeParam}`;

                return fetch(url, params)
                .then(response => response.json(), error => error.message || 'unknown error')
                .then(res => {
                    const error = !!res && res.error;
                    const studies = !!res
                        && !!res.response
                        && 1 === res.response.length
                        && !!res.response[0]
                        && res.response[0].result;
                    if (!!studies && !error) {
                        return studies.map(study => OpencgaProjectClient.translateStudyFromServer(userId, projectId, study));
                    } else {
                        throw new Error(error || "unknown-error");
                    }
                });
        } else {
            return Promise.reject('no-session');
        }
	}


	fetchSave(userId, project){
        if (!!this.opencga && !!this.opencga.session.getToken(userId) && !!userId) {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.opencga.sessionToken}`,
            };

            let newProject = {
                    name: project.name,
                    description: project.description,
            };

            if (!project.id){
            	newProject.organism = { scientificName: project.organism.scientificName, assembly: project.organism.assembly };
            	newProject.alias = !!project.name ? project.name.replace(/ /g, ''): project.name;
			}

            const bodyParams = JSON.stringify(newProject);

            const params = {
                method: 'POST',
                headers: headers,
				body: bodyParams
            };

            // TODO: 1.4.2
            // TODO: 1.3.8
            const url =  !!project && !!project.id ? `${this.opencga.url}/v${this.opencga.majorVersion}/projects/${project.id}/update` :
					`${this.opencga.url}/v${this.opencga.majorVersion}/projects/create`;

            return fetch(url, params)
                .then(response => response.json(), error => error.message || 'unknown error')
                .then(res => {
                    const error = !!res && res.error;
                    const project = !!res
                        && !!res.response
                        && 1 === res.response.length
                        && !!res.response[0]
                        && !!res.response[0].result
                        && res.response[0].result[0];
                    if (!!project && !error) {
                        return OpencgaUserClient.projectFromServer(project);
                    } else {
                        throw new Error(error || "unknown-error");
                    }
                });
        } else {
            return Promise.reject('no-session');
        }
	}
}

export default OpencgaProjectClient;