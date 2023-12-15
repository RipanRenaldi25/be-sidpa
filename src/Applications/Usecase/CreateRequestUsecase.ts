import Document from "../../Domains/Entities/Document/Document";
import { PROCESS } from "../../Domains/Entities/Request/IRequest";
import RequestRepositoryAbstract from "../../Domains/Repositories/RequestRepositoryAbstract";
import { RequestBuilder } from "../../Domains/Entities/Request/Request";
type Payload = {
    nik: string,
    documents: Document[]
}

class CreateRequestUsecase {
    requestRepository: RequestRepositoryAbstract

    constructor({requestRepository} : {requestRepository: RequestRepositoryAbstract
    }) {
        this.requestRepository = requestRepository;
    }

    async execute(payload: Payload) {
        const request = new RequestBuilder(payload.nik)
            .setProcess(PROCESS.UNPROCESS)
            .setDocuments(payload.documents)
            .build();
        
        const result = await this.requestRepository.requestDocuments(request, payload.nik);
        return result;
    }
}

export default CreateRequestUsecase;