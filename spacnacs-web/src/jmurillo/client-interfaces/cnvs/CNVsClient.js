import OpencgaClient from "../opencga/OpencgaClient";
import CNVsAnalysisClient from "./CNVsAnalysisClient";
import CNVsFileClient from "./CNVsFileClient";
import CNVsPrioritizationsClient from "./CNVsPrioritizationsClient";
import CNVsAdditionalInfoClient from "./CNVsAdditionalInfoClient";
import CNVAnnotationsClient from "./CNVsAnnotationsClient";
import CNVsIndividualClient from "./CNVsIndividualClient";
import CNVsCommonClient from "./CNVsCommonClient";

class CNVsClient extends OpencgaClient {
    constructor(config) {
        super(config);
        this.cnvsUrl = config.cnvsUrl;
    }

    get analysis() {
        return new CNVsAnalysisClient(this);
    }

    get individual() {
        return new CNVsIndividualClient(this);
    }

    get file(){
        return new CNVsFileClient(this)
    }

    get cnvs() {
        return new CNVsPrioritizationsClient(this);
    }

    get aditionaInfo(){
        return new CNVsAdditionalInfoClient(this)
    }

    get annotator(){
        return new CNVAnnotationsClient(this)
    }

    get common() {
        return new CNVsCommonClient(this);
    }
}

export default CNVsClient;

