/*istanbul ignore files */
import Document from "../Entities/Document/Document";
import Request from "../Entities/Request/Request";
abstract class RequestRepositoryAbstract {
    async requestDocuments(request: Request, nik: string): Promise<any> {
        throw new Error('REQUEST_REPOSITORY.REQUEST_DOCUMENT_METHOD_NOT_IMPLEMENTED');
    }
    async getRequestById(requestId: string): Promise<any> {
        throw new Error('REQUEST_REPOSITORY.REQUEST_DOCUMENT_METHOD_NOT_IMPLEMENTED');
    }
}

export default RequestRepositoryAbstract;