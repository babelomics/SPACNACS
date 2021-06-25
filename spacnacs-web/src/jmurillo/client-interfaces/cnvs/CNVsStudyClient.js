import OpencgaStudyClient from '../opencga/OpencgaStudyClient';
import CNVsAnalysisClient from './CNVsAnalysisClient';


class CNVsStudyClient extends OpencgaStudyClient {

    constructor(parent) {
        super(parent);
/*        // TODO: TOken temporal
        if (parent.sessionToken === undefined)
            parent.sessionToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJteWlkIiwiYXVkIjoiT3BlbkNHQSB1c2VycyIsImlhdCI6MTU3NDM0ODk2OCwiZXhwIjoxNTc0MzUyNTY4fQ._PQRGG7D3AM-jzzCW55E3Sa-CoxFebGMxt8_GNb6hM0";
        */
        this.parent = parent;
    }

    fetchAnalyses(userId, projectId, studyId, abortSignal) {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${this.opencga.sessionToken}`,
        };
        const params = {
            method: 'GET',
            headers: headers,
            signal: abortSignal,
        };
        if (!!this.parent && !!this.parent.sessionToken && !!userId && !!projectId && !!studyId) {
            const userParam = encodeURIComponent(userId);
            const projectParam = encodeURIComponent(projectId);
            const studyParam = encodeURIComponent(studyId);
            const url = `${this.parent.cgaplusUrl}/${userParam}/${projectParam}/${studyParam}/analyses`;
            return fetch(url, params).then(response => {
                if (200 === response.status && !!response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.statusText)
                }
            }).then(analyses => analyses.map(analysis => CNVsAnalysisClient.translateFromServer(analysis)));
        } else {
            return Promise.reject("no-session");
        }
    }


    /*
    
        fetchGroupInfo(userId, projectId, studyId, analysis){
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${this.opencga.sessionToken}`,
            };
            const params = {
                method: 'GET',
                headers: headers,
            };
    
            if (true) {
                // Get list Group
                let controlGroupInfo = [];
                //analyses.forEach(elto => {
                    let control = Array.isArray(analysis.groupControl) ? analysis.groupControl : [];
                    let study = Array.isArray(analysis.groupStudy) ? analysis.groupStudy : [];
                    controlGroupInfo = [...new Set([...controlGroupInfo, ...control, ...study])]
                //});
    
                const filters = {
                    "userId": userId,
                    "projectId": projectId,
                    "studyId": studyId,
                    "includeIndividual": true,
                    "samples": controlGroupInfo.join(",")
                };
                params["filters"] = filters;
    
                //const url = `${this.parent.cnvsUrl}/individuals/search`;
                //TODO: temporal url
                const url = `${this.parent.url}/individuals/search`;
    
                return fetch(url, params).then(response => {
                    if (200 === response.status && !!response.ok) {
                        return response.json()
                    } else {
                        throw new Error(response.statusText)
                    }
                }).then(gropuInfo =>
                     //gropuInfo.result
                    gropuInfo.result.map(analysis =>
                        CNVsAnalysisClient.translateFromServer(userId, projectId, studyId, analysis))
                );
    
            } else {
                return Promise.reject("no-session");
            }
    
        }*/

}


export default CNVsStudyClient;