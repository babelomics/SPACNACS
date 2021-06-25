
// user: {id, name, nativeId }
// project: {id, name, nativeId}
// study: {id, name, nativeId}

// session
//   login(username, password, onSuccess, onFailure)
// user
//   fetchUser(userId)
//   logout(user, onSuccess, onFailure)
//   fetchProjects(user, onSuccess, onFailure)
//   fetchProject(user, projectId, onSuccess, onFailure)
// project
//   fetchStudies(user, onSuccess, onFailure)
//   fetchStudy(user, studyId, onSuccess, onFailure)

class Client {
    get session() { throw new Error("not-implemented"); }
    get user() { throw new Error("not-implemented"); }
    get project() { throw new Error("not-implemented"); }
    get study() { throw new Error("not-implemented"); }
}

Client.instance = null;

export default Client;
