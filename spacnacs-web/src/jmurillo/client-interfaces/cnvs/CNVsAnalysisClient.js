import CNVsCommonClient from "./CNVsCommonClient";

class CNVsAnalysisClient {

    constructor(parent) {
        this.parent = parent;
    }


    static translateFromServer(userId, analysis) {
        let an =
         {
             ...analysis,
            userId: userId
        };
        if (!!analysis && !!analysis.creationDate)
            an.creationDate = CNVsCommonClient.parseCommonDate(analysis.creationDate);

        if (!!analysis && !!analysis.lastModified)
            an.lastModified = CNVsCommonClient.parseCommonDate(analysis.lastModified);

        return an;
    }

    /*
        static translateFromServer(userId, projectId, studyId, analysis, groupInfo) {
            analysis.groupControlInfo = [];
            if (analysis.groupControl !== undefined)
                analysis.groupControl.map( gc => (
                    groupInfo !== undefined && groupInfo.hasOwnProperty(gc) ?
                        analysis.groupControlInfo.push(groupInfo[gc]) : ""
                ));
    
            analysis.groupStudyInfo = [];
            if (analysis.groupStudy !== undefined)
                analysis.groupStudy.map( gc => (
                    groupInfo !== undefined && groupInfo.hasOwnProperty(gc) ?
                        analysis.groupStudyInfo.push(groupInfo[gc]) : ""
                ));
            return {
                ...analysis,
                creationDate: !!analysis.creationDate ? new Date(analysis.creationDate) : null,
                userId: userId,
                projectId: projectId,
                studyId: studyId,
            };
        }*/



    fetchAnalysesPage(userId, pageFilters, filters, abortSignal) {
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

            const url = `${this.parent.cnvsUrl}/analysis/search?${queryStrings.join("&")}`;

            return fetch(url, params).then(response => {
                if (200 === response.status && !!response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.statusText)
                }
            }).then(analyses =>
                analyses.result.map(analysis =>
                    CNVsAnalysisClient.translateFromServer(userId, analysis)).sort((a, b) => (a.creationDate !== undefined && a.creationDate > b.creationDate) ? -1 : 1)

            );
        } else {
            return Promise.reject("no-session");
        }
    }



    fetchData(userId, analysisId, abortSignal) {
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
            const analysisParam = !!analysisId ? encodeURIComponent(analysisId) : null;

            let queryStrings = [
                `userId=${userId}`
            ];

            const url = `${this.parent.cnvsUrl}/analysis/get/${analysisParam}?${queryStrings.join("&")}`;

            return fetch(url, params).then(response => {
                if (200 === response.status && !!response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText)
                }
            }).then(analyses => {
                return CNVsAnalysisClient.translateFromServer(userId,  (!!analyses && !!analyses.result) && ((analyses.result.length > 0 && analyses.result[0]) || {}))
            });

        } else {
            return Promise.reject("no-session");
        }
    }


    fetchSave(userId, analysis, abortSignal) {
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${this.parent.session.getToken(userId)}`,
        };

        if (!!this.parent.session.getToken(userId) && !!userId) {
            const bodyParams = new URLSearchParams();
            /*Object.keys(analysis).forEach(function(key) {
                if (key != "id" || (key == "id" && analysis["id"] != undefined )) {

                    if (bodyParams.get(key) !== null) {
                        bodyParams.append(key, analysis[key]);
                    } else {
                        bodyParams.set(key, analysis[key]);
                    }
                }
            });*/

            if (!!analysis && !!analysis.index) {
                /* analysis.index.forEach(s => {
                    bodyParams.append("index", !!s.id ? s.id : s.idSample);
                }); */
                bodyParams.append("index",  JSON.stringify(analysis.index));
            }

            if (!!analysis && !!analysis.groupStudy) {
                bodyParams.append("groupStudy",  JSON.stringify(analysis.groupStudy));
            }
             if (!!analysis && !!analysis.groupControl) {
                 bodyParams.append("groupControl",  JSON.stringify(analysis.groupControl));
            }

            if (!!analysis && !!analysis.samplesFiles) {
                bodyParams.append("samplesFiles",  JSON.stringify(analysis.samplesFiles));
            }

            if (!!analysis && !!analysis.name)
                bodyParams.set("name", analysis.name);

            if (!!analysis && !!analysis.phenotypes)
                bodyParams.append("phenotypes",  JSON.stringify(analysis.phenotypes));


            if (!!analysis && !!analysis.tags) {
                bodyParams.append("tags",  JSON.stringify(analysis.tags));
            }

            if (!!analysis && !!analysis.description)
                bodyParams.set("description", analysis.description);
            if (!!analysis && !!analysis.id)
                bodyParams.set("idAnalysis", analysis.id);

            let queryStrings = [
                `userId=${userId}`
            ];

            const params = {
                method: 'POST',
                headers: headers,
                body: bodyParams,
                signal: abortSignal,
            };


            const url = !!analysis && !!analysis.id ? `${this.parent.cnvsUrl}/analysis/update/${analysis.id}?${queryStrings.join("&")}` :
                `${this.parent.cnvsUrl}/analysis/create?${queryStrings.join("&")}`;

            return fetch(url, params).then(response => {
                if (200 === response.status && !!response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText)
                }
            }).then(analysis => {
                return CNVsAnalysisClient.translateFromServer(userId, (!!analysis && !!analysis.result) && ((analysis.result.length > 0 && analysis.result[0]) || {}))
            });

        } else {
            return Promise.reject("no-session");
        }

    }


    fetchDelete(userId, analysis, abortSignal) {
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
                `idAnalysis=${analysis.id}`
            ];

            const url =  `${this.parent.cnvsUrl}/analysis/delete/${analysis.id}?${queryStrings.join("&")}` ;

            return fetch(url, params).then(response => {
                if (200 === response.status && !!response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText)
                }
            }).then(analysis => {
                return (!!analysis && !!analysis.result) && ((analysis.result.length > 0 && analysis.result[0]) || {});
            });

        } else {
            return Promise.reject("no-session");
        }

    }






}


export default CNVsAnalysisClient;