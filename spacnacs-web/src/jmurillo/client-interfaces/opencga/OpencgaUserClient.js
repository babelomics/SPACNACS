import OpencgaSessionClient from "./OpencgaSessionClient";

class OpencgaUserClient {

    constructor(opencga) {
        this.opencga = opencga;
    }

    static fromServer(user) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            organization: user.organization,
            // account: {type, creationDate, expirationDate, authOrigin}
            // lastModified
            // projects: null,
        };
	}

	static parseOpencgaDate(dateString) {
		if (!!dateString && dateString.length >= 14) {
			const year = dateString.substring(0, 4);
			const month = dateString.substring(4, 6);
			const day = dateString.substring(6, 8);
			const hour = dateString.substring(8, 10);
			const minute = dateString.substring(10, 12);
			const second = dateString.substring(12, 14);
			const s = `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
			return new Date(s);
		} else {
			return null;
		}
	}

	static projectFromServer(project) {
		const res = {
			id: project.id,
			name: project.name,
			description: project.description,
			//organization: project.organization,
		};
		if (!!project.creationDate) {
			res.creationDate = OpencgaUserClient.parseOpencgaDate(project.creationDate);
		}
		if (!!project.modificationDate) {
			res.modificationDate = OpencgaUserClient.parseOpencgaDate(project.modificationDate);
		}
		if (!!project.organism) {
			res.organism = { scientificName: project.organism.scientificName, assembly: project.organism.assembly };
		}
		return res;
	}

    logout(user) {
        // TODO: cancel session renewals
        // TODO: save user state; this will make the state an API :(; should include client version
	}

    fetchData(userId) {
        if (!!this.opencga && !!this.opencga.session.getToken(userId)) {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.opencga.sessionToken}`,
            };
            const params = {
				method: 'GET',
                headers: headers,
            };
			const userIdParam = encodeURIComponent(userId);
            const includeParam = encodeURIComponent([ 'id', 'name', 'email', 'organization' ].join(','));
			const url = `${this.opencga.url}/v${this.opencga.majorVersion}/users/${userIdParam}/info?include=${includeParam}`;
            return fetch(url, params)
                .then(response => response.json(), error => error.message || 'unknown error')
                .then(res => {
                    const error = !!res && res.error;
                    const user = !!res &&
                        !!res.response &&
                        1 === res.response.length &&
                        !!res.response[0] &&
                        !!res.response[0].result &&
                        1 === res.response[0].result.length &&
                        res.response[0].result[0];
                    if (!!user && !error) {
                        return OpencgaUserClient.fromServer(user);
                    } else {
                        throw error || "unknown-error";
                    }
                });
        } else {
            return Promise.reject('no-session');
        }
	}

	fetchDataP(userId) {
		const func = this.fetchData.bind(this);
		return new Promise((resolve, reject) => {
			setTimeout(() => { resolve(func(userId)); }, 5000);
		});
	}

	fetchProjects(userId) {
        if (!!this.opencga && !!this.opencga.session.getToken(userId) ) {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.opencga.sessionToken}`,
            };
            const params = {
                method: 'GET',
                headers: headers,
            };
            const userIdParam = encodeURIComponent(userId);
            // const includeParam = encodeURIComponent([ 'projects' ].join(','));
            const excludeParam = encodeURIComponent([ 'projects.studies' ].join(','));
			// const url = `${this.opencga.url}/v${this.opencga.majorVersion}/users/${userIdParam}/info?include=${includeParam}&exclude=${excludeParam}`;
			const url = `${this.opencga.url}/v${this.opencga.majorVersion}/users/${userIdParam}/info?exclude=${excludeParam}`;

			return fetch(url, params)
                .then(response => response.json(), error => error.message || 'unknown error')
                .then(res => {
                    const error = !!res && res.error;
                    const projects = !!res &&
						!!res.response &&
						1 === res.response.length &&
						!!res.response[0] &&
						!!res.response[0].result &&
						1 === res.response[0].result.length &&
						!!res.response[0].result[0] &&
						res.response[0].result[0].projects;
                    if (!!projects && !error) {
						return projects.map(OpencgaUserClient.projectFromServer);
                    } else {
						throw new Error(error || "unknown-error");
                    }
                });
        } else {
            return Promise.reject('no-session');
        }
	}

    updateUser(user) {
        if (!!this.opencga.sessionToken && !!user && !!user.id) {
            const body = {};
            for (const key of ['name', 'email', 'organization']) {
                if (user.hasOwnProperty(key)) {
                    body[key] = user[key];
                }
            }
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.opencga.sessionToken}`,
            };
            const params = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body),
            };
            const userIdParam = encodeURIComponent(user.id);
            const url = `${this.opencga.url}/v${this.opencga.majorVersion}/users/${userIdParam}/update`;
            return fetch(url, params)
                .then(response => response.json(), error => error.message || 'unknown')
                .then(response => {
                    debugger;
                });
        } else {
            return Promise.reject('no-session');
        }
	}

	changePassword(userId, oldPassword, newPassword) {
		if (!!this.opencga.sessionToken && !!userId && !!oldPassword && !!newPassword) {
			const body = {
				password: oldPassword,
				newPassword: newPassword,
			};
			const headers = {
				Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.opencga.sessionToken}`,
			};
			const params = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body),
			};
			const userIdParam = encodeURIComponent(userId);
			const url = `${this.opencga.url}/v${this.opencga.majorVersion}/users/${userIdParam}/password`;
			return fetch(url, params)
				.then(response => response.json(), error => { throw new Error(error.message || 'unknown'); })
				.then(response => {
					const error = !!response && response.error;
					if (!error) {
						return true;
					} else {
						throw new Error(error || "unknown-error");
					}
				});
		} else {
			console.log(`No-session.user.id = ${userId}`)
			console.log(`No-session.password.current = ${oldPassword}`)
			console.log(`No-session.password.new = ${newPassword}`)
			console.log(`No-session.session.token = ${this.opencga.sessionToken}`)
			return Promise.reject('no-session');
		}
	}

}

export default OpencgaUserClient;