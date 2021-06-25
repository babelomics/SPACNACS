import jwtDecode from 'jwt-decode';

class OpencgaSessionClient {

    constructor(opencga) {
        this.opencga = opencga;
    }

    static fromServer(token) {
        const tokenInfo = jwtDecode(token);
        const tokenUsername = tokenInfo.sub;
        const tokenExpTime = tokenInfo.exp;
        const tokenExpDate = new Date(1000*tokenExpTime);
        return {
            userId: tokenUsername,
            token: token,
            expDate: tokenExpDate,
        };
    }

    login(username, password) {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            //,
            // Authorization: 'Bearer',
        };
        const body = {
            password: password,
        };
        const params = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        };
        const url = `${this.opencga.url}/v${this.opencga.majorVersion}/users/${encodeURIComponent(username)}/login`;
        return fetch(url, params).then(response => {
            return response.json()
        }, error => {
            return error.message || "unknown error";
        }).then(response => {
            const error = !!response && response.error;
            const token = !!response
                && !!response.response
                && 1 === response.response.length
                && !!response.response[0]
                && !!response.response[0].result
                && 1 === response.response[0].result.length
                && !!response.response[0].result[0]
                && response.response[0].result[0].token;
            if (!error && !!token) {
                this.opencga.sessionToken = token;
                // Add token to session
                sessionStorage.setItem('prioCNVscookie', token);

                return OpencgaSessionClient.fromServer(token);
            } else {
                throw error;
            }
        });
    }

    getToken(userId){
        // Get token to session
        let token = "";
        if (this.opencga && !!this.opencga.sessionToken)
            token = this.opencga.sessionToken;
        else {
            token = sessionStorage.getItem('prioCNVscookie');
            this.opencga.sessionToken = token;
        }

        return token;
    }
}

export default OpencgaSessionClient;