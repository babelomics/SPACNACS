import OpencgaSessionClient from './OpencgaSessionClient';
import OpencgaUserClient from './OpencgaUserClient';
import OpencgaProjectClient from './OpencgaProjectClient';
import OpencgaStudyClient from './OpencgaStudyClient';
import OpencgaVariantClient from './OpencgaVariantClient';
//import OpencgaSampleClient from './OpencgaSampleClient';

import Client from '../Client';
//import OpencgaIndividualClient from "./OpencgaIndividualClient";

class OpencgaClient extends Client {

    constructor(config) {
        super();
        this.url = config.url;
        this.majorVersion = config.majorVersion;
        this.minorVersion = config.minorVersion;
        this.sessionToken = null;
    }


    get session() {
        return new OpencgaSessionClient(this);
    }

    get user() {
        return new OpencgaUserClient(this);
    }

    get project() {
        return new OpencgaProjectClient(this);
    }

    get study() {
        return new OpencgaStudyClient(this);
	}
/*
	get individual(){
        return new OpencgaIndividualClient(this);
    }*/

  /*  get sample() {
        return new OpencgaSampleClient(this)
    }*/

	get analysis() {
		throw Error("not-implemented");
    }
    
    get variant() {
        return new OpencgaVariantClient(this);
    }
}

export default OpencgaClient;
