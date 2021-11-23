class CNVsCommonClient {

    constructor(parent) {
        this.parent = parent;
    }

    static parseCommonDate(dateString) {
        if (!!dateString){
            if ( dateString.length >= 14 && !dateString.includes("-")) {
                const year = dateString.substring(0, 4);
                const month = dateString.substring(4, 6);
                const day = dateString.substring(6, 8);
                const hour = dateString.substring(8, 10);
                const minute = dateString.substring(10, 12);
                const second = dateString.substring(12, 14);
                const s = `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
                return new Date(s);
            } else {
                try {
                    return new Date (dateString)
                } catch (error) {
                    console.error(error);
                }
            }
        } else {
            return null;
        }
    }

    static getQuerString(userId, pageFilters, filters){
        const skipParam = pageFilters.page;
        const limitParam = encodeURIComponent(pageFilters.pageSize);
        const queryStrings = [
            `skip=${skipParam}`,
            `limit=${limitParam}`,
            `userId=${userId}`
        ];

        if (filters.searchText != undefined && filters.searchText !== "")
            queryStrings.push(`searchText=${filters.searchText}`);

        if (filters.sortField != undefined && filters.sortField !== "")
            queryStrings.push(`sort=${filters.sortField}`);

        return queryStrings;
    }


    fetchTags(userId, typeTags, abortSignal) {
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

            const queryStrings = [
                `userId=${userId}`
            ];            if (typeTags != undefined &&typeTags !== "")
                queryStrings.push(`typeTag=${typeTags}`);

            const url = `${this.parent.cnvsUrl}/filters/tags?${queryStrings.join("&")}`;

            return fetch(url, params).then(response => {
                if (200 === response.status && !!response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.statusText)
                }
            }).then(tags =>{
                    return (!!tags && !!tags.result) && ((tags.result.length > 0 && tags.result.sort()) || []);
                }

            );
        } else {
            return Promise.reject("no-session");
        }
    }

}

export default CNVsCommonClient;
