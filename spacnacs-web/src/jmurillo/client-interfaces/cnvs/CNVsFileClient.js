import CNVsCommonClient from "./CNVsCommonClient";


class CNVsFileClient {

    constructor(parent) {
        this.parent = parent;
    }

    static translateFromServer(userId, fileSample) {
        let sf = {
                ...fileSample,
                userId: userId
        };

        if (!!fileSample && !!fileSample.creationDate)
            sf.creationDate = CNVsCommonClient.parseCommonDate(fileSample.creationDate);

        if (!!fileSample && !!fileSample.lastModified)
            sf.lastModified = CNVsCommonClient.parseCommonDate(fileSample.lastModified);


        if (!!fileSample && !!fileSample.individual && !!fileSample.individual.creationDate)
            sf.individual.creationDate = CNVsCommonClient.parseCommonDate(fileSample.creationDate);

        if (!!fileSample && !!fileSample.individual && !!fileSample.individual.lastModified)
            sf.individual.lastModified = CNVsCommonClient.parseCommonDate(fileSample.lastModified);


        return sf;
    }


    fetchData(userId, fileSampleId, abortSignal) {
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
            const fileSampleParam = !!fileSampleId ? encodeURIComponent(fileSampleId) : null;

            let queryStrings = [
                `userId=${userId}`
            ];

            const url = `${this.parent.cnvsUrl}/fileSampleCNVs/get/${fileSampleParam}?${queryStrings.join("&")}`;

            return fetch(url, params).then(response => {
                if (200 === response.status && !!response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText)
                }
            }).then(sampleFile => {
                return CNVsFileClient.translateFromServer(userId,  (!!sampleFile && !!sampleFile.result) && ((sampleFile.result.length > 0 && sampleFile.result[0]) || {}))
            });

        } else {
            return Promise.reject("no-session");
        }
    }


    fetchPage(userId,  pageFilters, filters, abortSignal) {
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
            if (filters.individualId !== undefined && filters.individualId !== "")
                queryStrings.push(`individualId=${filters.individualId}`);
            // const userParam = encodeURIComponent(userId);
            // const projectParam = encodeURIComponent(projectId);
            // const studyParam = encodeURIComponent(studyId);
            // const sampleIdParam = encodeURIComponent(sampleId);
            // const fileIdParam = encodeURIComponent(fileId);

            const url = `${this.parent.cnvsUrl}/fileSampleCNVs/search?${queryStrings.join("&")}`;
/*
            let url = "";
            if (!!fileId ){
                url = `${this.parent.cnvsUrl}/fileSampleCNVs/get/${userId}/${fileId}`;
            } else {
                if (!!sampleId ){
                    url = `${this.parent.cnvsUrl}/fileSampleCNVs/search/${userId}?sampleId=${sampleId}`;
                } else
                    url = `${this.parent.cnvsUrl}/fileSampleCNVs/search/${userId}?studyId=${studyId}`;
            }
*/
            return fetch(url, params).then(response => {
                if (200 === response.status && !!response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText)
                }
            }).then(samplesFiles => {
                    console.log(samplesFiles);
                    return samplesFiles.result.map(sampleFile => CNVsFileClient.translateFromServer(userId, sampleFile))
                    /*samplesFiles.result.map(sampleFile =>
                        CNVsFileClient.translateFromServer(userId, sampleFile)).sort((a, b) =>
                        (a.creationDate != undefined && a.creationDate > b.creationDate) ? -1 : 1)}
                        */
                }
            );
/*
                if (!!fileId || !!sampleId )
                    return CNVsFileClient.translateFromServer(userId, projectId, studyId, (!!sampleFile && !!sampleFile.result) && ((sampleFile.result.length > 0 && sampleFile.result[0]) || ""))
                else {
                    return sampleFile.result.map(sF => CNVsFileClient.translateFromServer(userId, projectId, studyId, sF));
                }
            });
*/
        } else {
            return Promise.reject("no-session");
        }
    }

    fetchDeselectIndividualSave(userId, sampleFileId, abortSignal){
        const headers = {
            "Accept": "application/json",
            'Content-Type': 'application/json',

            //,
            // If you add this, upload won't work
            //   "Content-Type": "multipart/form-data",
            /*
            Accept: 'application/json',
            'Content-Type': 'application/json',*/
            Authorization: `Bearer ${this.parent.session.getToken(userId)}`,
        };
        if (!!this.parent.session.getToken(userId) && !!userId) {

            const params = {
                method: 'GET',
                headers: headers,
  //              body: formData,
                //body: bodyParams,
                signal: abortSignal,
            };
            let queryStrings = [
                `userId=${userId}`
            ];

            const url = `${this.parent.cnvsUrl}/fileSampleCNVs/delete/individual/${sampleFileId}?${queryStrings.join("&")}`;

            return fetch(url, params).then(response => {
                if (200 === response.status && !!response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText)
                }
            }).then(sampleFile => {
                return CNVsFileClient.translateFromServer(userId,  (!!sampleFile && !!sampleFile.result) && ((sampleFile.result.length > 0 && sampleFile.result[0]) || {}))
            });

        } else {
            return Promise.reject("no-session");
        }
    }


    fetchSave(userId, sampleFile, abortSignal) {
        const headers = {
            "Accept": "application/json",
            //,
            // If you add this, upload won't work
            //   "Content-Type": "multipart/form-data",
            /*
            Accept: 'application/json',
            'Content-Type': 'application/json',*/
            Authorization: `Bearer ${this.parent.session.getToken(userId)}`,
        };
        if (!!this.parent.session.getToken(userId) && !!userId) {
            const formData = new FormData();


            if (!!sampleFile.sampleName)
                formData.append("sampleName", sampleFile.sampleName);

            if (!!sampleFile && !!sampleFile.tags) {
                formData.append("tags",  JSON.stringify(sampleFile.tags));
            }

            if (!!sampleFile.description)
                formData.append("description", sampleFile.description);

            //if (!!sampleFile.phenotypes)
            //formData.append("phenotypes", sampleFile.phenotypes);

            if (!!sampleFile.individual)
                formData.append("individual", JSON.stringify({"id":sampleFile.individual.id, name:sampleFile.individual.name}));

            if (!!sampleFile.technology)
                formData.append("technology", sampleFile.technology);
            if (!!sampleFile.technology)
                formData.append("scopeTechnology", sampleFile.scopeTechnology);
            if (!!sampleFile.detectiont)
                formData.append("detectiont", sampleFile.detectiont);

            if(!!sampleFile.fileSample) {
                formData.append("file", sampleFile.fileSample);
                formData.append("nameFile", sampleFile.fileSample.name);            }


            const params = {
                method: 'POST',
                headers: headers,
                body: formData,
                //body: bodyParams,
                signal: abortSignal,
            };
            let queryStrings = [
                `userId=${userId}`
            ];

            const url = !!sampleFile && !!sampleFile.id ? `${this.parent.cnvsUrl}/fileSampleCNVs/update/${sampleFile.id}?${queryStrings.join("&")}` :
                `${this.parent.cnvsUrl}/fileSampleCNVs/create?${queryStrings.join("&")}`;

            return fetch(url, params).then(response => {
                if (200 === response.status && !!response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText)
                }
            }).then(sampleFile => {
                return CNVsFileClient.translateFromServer(userId,  (!!sampleFile && !!sampleFile.result) && ((sampleFile.result.length > 0 && sampleFile.result[0]) || {}))
            });

        } else {
            return Promise.reject("no-session");
        }
    }

    // Remove only file
    fetchDeleteFile(userId, sampleFile, abortSignal) {
        const headers = {
            "Accept": "application/json",
         //   "Content-Type": "application/x-www-form-urlencoded",
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
                `userId=${userId}`
                //,
              //  `sampleFileId=${sampleFile.id}`
            ];

            const url =  `${this.parent.cnvsUrl}/fileSampleCNVs/deleteFile/${sampleFile.id}?${queryStrings.join("&")}` ;

            return fetch(url, params).then(response => {
                if (200 === response.status && !!response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText)
                }
            }).then(sampleFile => {
                return (!!sampleFile && !!sampleFile.result) && ((sampleFile.result.length > 0 && sampleFile.result[0]) || {});
            });

        } else {
            return Promise.reject("no-session");
        }

    }

    fetchCountFile(userId, sampleFileId, abortSignal){
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
                `userId=${userId}`
                //,
                //  `sampleFileId=${sampleFile.id}`
            ];

            const url =  `${this.parent.cnvsUrl}/fileSampleCNVs/file/${sampleFileId}/count?${queryStrings.join("&")}` ;


            return fetch(url, params).then(response => {
                if (200 === response.status && !!response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText)
                }
            }).then(sampleFile => {
                return (!!sampleFile && !!sampleFile.result) && ((sampleFile.result.length > 0 && sampleFile.result[0]) || 0);
            });

        } else {
            return Promise.reject("no-session");
        }
    }


    fetchLoadIndividualSample(userId, projectId, studyId, individualsSamples) {
        const headers = {
            "Accept": "application/json"
            //,
            // If you add this, upload won't work
            //   "Content-Type": "multipart/form-data",
            /*
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${this.opencga.sessionToken}`,*/
        };

        //let temp = translateProyectToServer(userId, project);
        //let newAnalysis = analysis;
        //  newAnalysis["projectId"] = projectId;
        //   newAnalysis["studyId"] = studyId;

        //        const bodyParams = JSON.stringify(newAnalysis);

        /*Object.keys(analysis).forEach(function(key) {
            if (key != "id" || (key == "id" && analysis["id"] != undefined )) {

                if (bodyParams.get(key) !== null) {
                    bodyParams.append(key, analysis[key]);
                } else {
                    bodyParams.set(key, analysis[key]);
                }
            }
        });*/
        /*
        const bodyParams = new URLSearchParams();

        bodyParams.set("file", sampleFile.fileSample);
        bodyParams.set("nameFile", sampleFile.fileSample.name);
        bodyParams.set("disease", sampleFile.disease);
        bodyParams.set("technology", sampleFile.technology);
        bodyParams.set("scopeTechnology", sampleFile.scopeTechnology);
        bodyParams.set("detectiont", sampleFile.detectiont);


        bodyParams.set("idProject", projectId);
        bodyParams.set("idStudy", studyId);

        if(!!sampleFile && !!sampleFile.id)
            bodyParams.set("sampleId", sampleFile.id);
*/

        const formData = new FormData();
        if (individualsSamples.fileIndividualsSamples !== null && individualsSamples.fileIndividualsSamples != undefined) {
            formData.append("fileIndividualsSamples", individualsSamples.fileIndividualsSamples);
        }
        if (individualsSamples.filesCNVs !== null && individualsSamples.fileIndividualsSamples != undefined) {
            for (var i = 0; i < individualsSamples.filesCNVs.length; i++)
                formData.append("filesCNVs", individualsSamples.filesCNVs[i]);
            //formData.append("filesCNVs[]", individualsSamples.filesCNVs);
        }

        const params = {
            method: 'POST',
            headers: headers,
            body: formData,
            //body: bodyParams,
            //signal: abortSignal,
        };

        // TODO: remove comment
        // if (!!this.parent && !!this.parent.sessionToken && !!userId && !!projectId && !!studyId) {
        if (true) {
            //const url =  !!sampleFile && !!sampleFile.id ? `${this.parent.cnvsUrl}/fileCNVs/${projectId}/${studyId}/update/${sampleFile.id}` :
            //  `${this.parent.cnvsUrl}/fileCNVs/create/${userId}`;

            const url = `${this.parent.cnvsUrl}/fileCNVs/loadIndividualsSamples/${userId}?studyId=${studyId}`;

            return fetch(url, params).then(response => {
                if (200 === response.status && !!response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText)
                }
            }).then(sampleFile => {
                return !!sampleFile && !!sampleFile.result && sampleFile.result.length > 0 && sampleFile.result[0];
            });

        } else {
            return Promise.reject("no-session");
        }
    }

    fetchDelete(userId, sampleFile, abortSignal) {
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
                `sampleFileId=${sampleFile.id}`
            ];

            const url =  `${this.parent.cnvsUrl}/fileSampleCNVs/delete/${sampleFile.id}?${queryStrings.join("&")}` ;

            return fetch(url, params).then(response => {
                if (200 === response.status && !!response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText)
                }
            }).then(sampleFile => {
                return (!!sampleFile && !!sampleFile.result) && ((sampleFile.result.length > 0 && sampleFile.result[0]) || {});
            });

        } else {
            return Promise.reject("no-session");
        }

    }

}


export default CNVsFileClient;