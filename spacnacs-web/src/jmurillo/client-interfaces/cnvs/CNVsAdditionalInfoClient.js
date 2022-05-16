
function translateComentFromServer(cnvs, comment) {
    return cnvs.comment = comment
}

class CNVsAdditionalInfoClient {

    constructor(parent) {
        this.parent = parent;
    }

    updateOrder (userId, analisis, cnv, order, abortSignal){
        // TODO : PrioCNVs --> add !!this.parent.sessionToken
        if (!!this.parent && //!!this.parent.sessionToken &&
            !!userId && !!analisis &&  !!cnv ) {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // TODO : PrioCNVs --> add authorization
                //Authorization: `Bearer ${this.parent.sessionToken}`,
            };

            const params = {
                method: 'POST',
                headers: headers,
                //body: bodyParams,
                signal: abortSignal,
            };

            const queryStrings = [
                `sampleId=${cnv.sampleId}`,
                `chromosome=${cnv.chromosome}`,
                `start=${cnv.start}`,
                `end=${cnv.end}`,
                `ty=${cnv.ty}`,
                `order=${order}`
            ];

            // TODO: PrioCNVs
           // const url = `${this.parent.cnvsUrl}/prioritization/${analisis.id}/order?${new URLSearchParams(paramsCNVs).toString()}`;
            const url = `${this.parent.cnvsUrl}/prioritization/${analisis.id}/order?${queryStrings.join("&")}`;
            return fetch(url, params)
                .then(response => response.json(), error => error.message || 'unknown error')
                .then(res => {
                    const error = !!res && res.error && !!res.error.msg;
                    const variantOrders = !!res && res.result;
                    if (!!variantOrders && !error) {
                        return variantOrders[0];
                    } else {
                        throw error || "unknown-error";
                    }
                });
        } else {
            return Promise.reject('no-session');
        }
    }

    updateComment(userId, cnvs, comment, abortSignal) {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.parent.session.getToken(userId)}`,
        };

        if ( !!this.parent.session.getToken(userId)  && !!userId) {
            const bodyParams = JSON.stringify({
                textComment: comment.textComment,
            });

            const paramsCNVs = {
                chromosome: cnvs.chromosome,
                start: cnvs.start,
                end: cnvs.end,
                ty: cnvs.ty,
                idAnalysis : comment.idAnalysis,
                userId:`${userId}`
            }


            const params = {
                method: 'POST',
                headers: headers,
                body: bodyParams,
                signal: abortSignal,
            };
            const url = `${this.parent.cnvsUrl}/addInfo/comments/crud?${new URLSearchParams(paramsCNVs).toString()}`;
            return fetch(url, params)
                .then(response => response.json(), error => error.message || 'unknown error')
                .then(res => {
                    const error = !!res && res.error && !!res.error.msg;
                    const comments = !!res && res.result;
                    if (!!comments && !error) {
                        if (comments.length > 0)
                            return translateComentFromServer(cnvs, comments[0])
                        //return comments.map(comment => translateComentFromServer(cnvs, comment));
                    } else {
                        throw error || "unknown-error";
                    }
                });
        } else {
            return Promise.reject('no-session');
        }
    }

    addPathogenicity(userId, idAnalysis,  variant, pathogenicity, abortSignal) {
        if (!!userId && !!variant && !!pathogenicity)
            return this.crudPathogenicity(userId, idAnalysis, variant, pathogenicity, "create", abortSignal);
    }

    deletePathogenicity(userId, idAnalysis, variant, idPathogenicity, abortSignal) {
        if (!!userId && !!variant && !!idPathogenicity)
            return this.crudPathogenicity(userId, idAnalysis, variant, { idPathogenicity: idPathogenicity }, "delete", abortSignal);
    }


    crudPathogenicity(userId, idAnalysis, variant, pathogenicity, action, abortSignal) {
        // TODO : PrioCNVs --> add !!this.parent.sessionToken
        if (!!this.parent && //!!this.parent.sessionToken &&
            !!userId && !!variant && !!action) {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // TODO : PrioCNVs --> add authorization
                //Authorization: `Bearer ${this.parent.sessionToken}`,
            };

            const paramsCNVs = action === "create" ?
                {
                    chromosome: variant.chromosome,
                    start: variant.start,
                    end: variant.end,
                    ty: variant.ty,
                    clinSign: pathogenicity.clinSign,
                    evidence: pathogenicity.evidence,
                    author: userId,
                    idAnalysis: idAnalysis,
                    userId: userId
                } : {
                    chromosome: variant.chromosome,
                    start: variant.start,
                    end: variant.end,
                    ty: variant.ty,
                    idPathogenicity: pathogenicity.idPathogenicity,
                    author: userId,
                    idAnalysis: idAnalysis,
                    userId: userId
                };

            const params = {
                method: 'POST',
                headers: headers,
                // body: bodyParams,
                signal: abortSignal,
            };

            // TODO: PrioCNVs
            const url = `${this.parent.cnvsUrl}/addInfo/pathogenicity/${action}?${new URLSearchParams(paramsCNVs).toString()}`;
            return fetch(url, params)
                .then(response => response.json(), error => error.message || 'unknown error')
                .then(res => {
                    const error = !!res && res.error && !!res.error.msg;
                    const isCrud = !!res && res.result;
                    if (!!isCrud && !error) {
                        return res.result;
                    } else {
                        throw error || "unknown-error";
                    }
                });
        } else {
            return Promise.reject('no-session');
        }

    }
}


export default CNVsAdditionalInfoClient;