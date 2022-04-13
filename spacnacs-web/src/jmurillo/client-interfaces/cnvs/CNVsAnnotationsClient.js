class CNVsAnnotationsClient {

    constructor(parent) {
        this.parent = parent;
    }
/*
    static translateFromServer(userId, projectId, studyId, fileSample) {

        //if (!!analysis)
        //	analysis.samples = [];
        // !!analysis && !!analysis.groupStudy && analysis.groupStudy.forEach(gc => analysis.samples.push({sampleId:gc, typeGroup:"C"}));
        //!!analysis && !!analysis.groupControl && analysis.groupControl.forEach(gc => analysis.samples.push({sampleId:gc, typeGroup:"S"}));

        return {
            ...fileSample,
            creationDate: !!fileSample.creationDate ? new Date(fileSample.creationDate) : null,
            userId: userId,
            projectId: projectId,
            studyId: studyId,
        };
    }

*/

    translateAnnotationTermFromServer(annotationField, term) {
        let outTerm = {
            id: "",
            name: "",
            description: "",
            annotationField: annotationField
        };
        let desc = "";
        if(annotationField === "gene"){
            if (!!term.hgncs){
              term.hgncs.forEach(h => {
                  if (h.listSynonym !== null && h.listSynonym != undefined)
                    desc = h.listSynonym.join(", ");
              });
            }
        }
        switch(annotationField){
            case "hpo":
                outTerm.id = term.hpoId;
                outTerm.name = term.hpoName;
                outTerm.description = term.hpoDescription;
                break;
            case "omim":
                outTerm.id = term.omimId;
                outTerm.name = term.omimName;
                break;
            case "orpha":
                outTerm.id = term.orphaId;
                outTerm.name = term.name;
                //outTerm.description = term.hpoDescription;
                break;
            case "go":
                outTerm.id = term.goId;
                outTerm.name = term.definition;
                outTerm.description = term.typeFunc;
                break;
            case "gene":
                outTerm.id = term.geneSymbol;
                outTerm.description = desc;
                outTerm.chromosome = term.chromosome;
                outTerm.start = term.start;
                outTerm.end = term.end;
                break;
            case "disgenet":
                outTerm.id = term.diseaseId;
                outTerm.name = term.diseaseName;
                break;
            default:
                break;
        }
        return outTerm;
    }


    fetchData (fileInput) {
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


        const formData = new FormData();
        formData.append("fileInput", fileInput[0]);

        formData.append("nameFile", fileInput[0].name);


        const params = {
            method: 'POST',
            headers: headers,
            body: formData,
            //body: bodyParams,
            //signal: abortSignal,
        };

        //const url =  !!sampleFile && !!sampleFile.id ? `${this.parent.cnvsUrl}/fileCNVs/${projectId}/${studyId}/update/${sampleFile.id}` :
        //  `${this.parent.cnvsUrl}/fileCNVs/create/${userId}`;
        const url = `${this.parent.cnvsUrl}/annotations/annotator/`;

        return fetch(url, params).then(response => {
            if (200 === response.status && !!response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText)
            }
        }).then(fileOutput => {
            console.log("entra");

            var url = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fileOutput));

            var a = document.createElement('a');
            a.href = url;
            a.download = fileInput[0].name.replace(".csv","")+"_annotate"+".json";
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();
            a.remove();



            return fileOutput;
            //return CNVsFileClient.translateFromServer(userId, projectId, studyId, (!!sampleFile && !!sampleFile.result) && ((sampleFile.result.length > 0 && sampleFile.result[0]) || ""))
        });


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
        if (individualsSamples.fileIndividualsSamples !== null && individualsSamples.filesCNVs != undefined) {
            formData.append("fileIndividualsSamples", individualsSamples.fileIndividualsSamples);
        }
        if (individualsSamples.filesCNVs !== null && individualsSamples.filesCNVs != undefined) {
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




    // Search term HPO, GO, DISGENET, OMIMS, ORPHA
    searchAnnotationTerm(annotationField, searchText, page, pageSize) {
        const searchTextParam = encodeURIComponent(searchText);
        //const url = `https://playground.phenotips.org/rest/vocabularies/hpo/suggest?input=${searchTextParam}`;
        //const url = `http://localhost:8084/rest/vocabularies/hpo/suggest?input=${searchTextParam}`;

        let queryStrings = [
            `searchText=${searchTextParam}`

        ];
        if (page !== undefined){
            queryStrings.push("page="+page);
            queryStrings.push("pageSize="+pageSize);
        }

       // let url = `https://hpo.jax.org/api/hpo/search?${queryStrings.join("&")}`;
        
       // if (annotationField != "hpo")
         let   url = `${this.parent.cnvsUrl}/annotations/searchAnnotationTerm/${annotationField}?${queryStrings.join("&")}`;

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        const params = {
            method: 'GET',
            headers: headers,
        };
        const pThis = this;

       return fetch(url, params)
            .then(response => response.json(), error => error.message || 'unknown error')
            .then(res => {
               // if (annotationField != "hpo")
                    return !!res && !!res.result && {
                        result: res.result.map(term => this.translateAnnotationTermFromServer(annotationField, term || [])),
                        numTotalResults: res.numTotalResults
                    };
                //else
                //    return {
                     //   result: res.terms,
                   //     numTotalResults: !!res.terms ? res.terms.length: 0
                 //   }
            });
    }

}


export default CNVsAnnotationsClient;