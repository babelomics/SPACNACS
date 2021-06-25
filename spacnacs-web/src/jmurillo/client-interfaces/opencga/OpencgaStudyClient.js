import OpencgaCommon from './OpencgaCommon';

class OpencgaStudyClient {

    // project
    // id
    // name
    // individuals

    constructor(opencga) {
        this.opencga = opencga;
    }

    static translateFromServer(userId, projectId, studyId, opencgaStudy) {
        return {
			userId: userId,
			projectId: projectId,
			id: studyId,
			name: opencgaStudy.name,
			description: opencgaStudy.description,
			type: opencgaStudy.type,
            creationDate: OpencgaCommon.parseOpencgaDate(opencgaStudy.creationDate),
        };
	}

	static translateAnalysisFromServer(userId, projectId, studyId, opencgaAnalysis) {
		return {
			userId: userId,
			projectId: projectId,
			id: studyId,
			type: opencgaAnalysis.type,
			description: opencgaAnalysis.description,
			...opencgaAnalysis,
		};
	}

	fetchData(userId, projectId, studyId) {
		if (!!this.opencga && !!this.opencga.session.getToken(userId) && !!userId && !!projectId && !!studyId) {
			const headers = {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.opencga.sessionToken}`,
			};
			const params = {
				method: 'GET',
				headers: headers,
			};
			const studyParam = encodeURIComponent(`${userId}@${projectId}:${studyId}`);
			const fieldsToInclude = [
				'name',
				'type',
				'creationDate',
				'modificationDate',
				'description'
			];
			const includeParam = encodeURIComponent(fieldsToInclude.join(','));
			const url = `${this.opencga.url}/v${this.opencga.majorVersion}/studies/${studyParam}/info?include=${includeParam}`;
			return fetch(url, params)
				.then(response => response.json(), error => error.message || 'unknown error')
				.then(res => {
					const error = !!res && res.error;
					const study = !!res
						&& !!res.response
						&& 1 === res.response.length
						&& !!res.response[0]
						&& !!res.response[0].result
						&& 1 === res.response[0].result.length
						&& res.response[0].result[0];
					if (!!study && !error) {
						return OpencgaStudyClient.translateFromServer(userId, projectId, studyId, study);
					} else {
						throw error || "unknown-error";
					}
				});
		} else {
			return Promise.reject('no-session');
		}
	}

	fetchAnalyses(userId, projectId, studyId) {
		if (!!this.opencga && !!this.opencga.session.getToken(userId)&& !!userId && !!projectId && !!studyId) {
			const headers = {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.opencga.sessionToken}`,
			};
			const params = {
				method: 'GET',
				headers: headers,
			};
			const studyParam = encodeURIComponent(`${userId}@${projectId}:${studyId}`);
			const url = `${this.opencga.url}/v${this.opencga.majorVersion}/analysis/clinical/search?study=${studyParam}`;
			return fetch(url, params)
				.then(response => response.json(), error => error.message || 'unknown error')
				.then(res => {
					const error = !!res && res.error;
					const analyses = !!res
						&& !!res.response
						&& 1 === res.response.length
						&& !!res.response[0]
						&& res.response[0].resultType === "org.opencb.opencga.core.models.ClinicalAnalysis"
						&& res.response[0].result;
					if (!!analyses && !error) {
						return analyses.map(analysis => OpencgaStudyClient.translateAnalysisFromServer(userId, projectId, studyId, analysis));
					} else {
						throw error || "unknown-error";
					}
				});
		} else {
			return Promise.reject('no-session');
		}
	}


    fetchSave(userId, projectId, study){
        if (!!this.opencga && !!this.opencga.session.getToken(userId) && !!userId) {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.opencga.sessionToken}`,
            };

            //let temp = translateProyectToServer(userId, project);
            let newStudy = {};
            if(!study.id) {
                newStudy = study;
                newStudy.alias = !!newStudy.name ? newStudy.name.replace(/ /g, ''): newStudy.name;
            } else {
                //newStudy.id = study.id;
                newStudy.name = study.name;
                newStudy.alias = study.alias;
                newStudy.type = study.type;
                newStudy.description = study.description;
			}

            const bodyParams = JSON.stringify(newStudy);

            const params = {
                method: 'POST',
                headers: headers,
                body: bodyParams
            };

            // TODO: 1.4.2
            // TODO: 1.3.8
            const url =  !!study && !!study.id ? `${this.opencga.url}/v${this.opencga.majorVersion}/studies/${study.id}/update` :
                `${this.opencga.url}/v${this.opencga.majorVersion}/studies/create?projectId=${projectId}`;

            return fetch(url, params)
                .then(response => response.json(), error => error.message || 'unknown error')
                .then(res => {
                    const error = !!res && res.error;
                    const study = !!res
                        && !!res.response
                        && 1 === res.response.length
                        && !!res.response[0]
                        && !!res.response[0].result
                        && res.response[0].result[0];
                    if (!!study && !error) {
                        return OpencgaStudyClient.translateFromServer(userId, projectId, study.id, study);
                    } else {
                        throw new Error(error || "unknown-error");
                    }
                });
        } else {
            return Promise.reject('no-session');
        }
    }

	// fetchAnalyses
	// fetchPanels
	// fetchIndividuals

    // fetchStudy(sessionToken, user, project, studyId) {
    //     if (!!sessionToken && !!user && !!user.id && !!project && !!project.id && !!studyId) {
    //         const headers = {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${sessionToken}`,
    //         };
    //         const params = {
    //             method: 'GET',
    //             headers: headers,
    //         };
    //         const studyParam = encodeURIComponent(`${user.id}@${project.id}:${studyId}`);
    //         const includeParam = encodeURIComponent(['id', 'name', 'type', 'creationDate', 'modificationDate', 'description', 'fqn'].join(','));
    //         const url = `${this.opencga.url}/v${this.opencga.majorVersion}/studies/${studyParam}/info?include=${includeParam}`;
    //         return fetch(url, params)
    //             .then(response => response.json(), error => error.message || 'unknown error')
    //             .then(res => {
    //                 const error = !!res && res.error;
    //                 const study = !!res
    //                     && !!res.response
    //                     && 1 === res.response.length
    //                     && !!res.response[0]
    //                     && !!res.response[0].result
    //                     && 1 === res.response[0].result.length
    //                     && res.response[0].result[0];
    //                 if (!!project && !error) {
    //                     return OpencgaStudyClient.fromServer(user, project, study);
    //                 } else {
    //                     throw error || "unknown-error";
    //                 }
    //             });
    //     } else {
    //         return Promise.reject('no-session');
    //     }
    // }

    // fetchIndividuals(study, onSuccess, onFailure) {
    //     const sessionToken = !!study && !!study.project && !!study.project.user && study.project.user.sessionToken;
    //     if (!sessionToken) {
    //         onFailure('no-session');
    //     } else {
    //         const url = `${this.opencga.url}/${this.opencga.version}/individuals/search` ;
    //         const body = {
    //             "sid": sessionToken,
    //             "study": study.nativeId,
    //         };
    //         const controller = new AbortController();
    //         const paramsString = new URLSearchParams(Object.entries(body)).toString();
    //         const urlWithParams = `${url}?${paramsString}`;
    //         fetch(urlWithParams, controller.signal).then(response => {
    //             if (!response.ok) {
    //                 onFailure(response.statusText);
    //             } else {
    //                 return response.json();
    //             }
    //         }).then(data => {
    //             const individuals = data.response[0].result;
    //             onSuccess(individuals);
    //         }).catch(error => {
    //             onFailure(error);
    //         });
    //     }
    // }
}

export default OpencgaStudyClient;