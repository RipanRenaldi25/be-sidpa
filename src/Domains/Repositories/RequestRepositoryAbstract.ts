/*istanbul ignore files */
import { PROCESS } from "../Entities/Request/IRequest";
import Request from "../Entities/Request/Request";
abstract class RequestRepositoryAbstract {
    async requestDocuments(request: Request, nik: string): Promise<any> {
        throw new Error('REQUEST_REPOSITORY.REQUEST_DOCUMENT_METHOD_NOT_IMPLEMENTED');
    }
    async getRequestById(requestId: string): Promise<any> {
        throw new Error('REQUEST_REPOSITORY.GET_REQUEST_BY_ID_METHOD_NOT_IMPLEMENTED');
    }
    async getRequestByNik(nik: string): Promise<any>{
        throw new Error('REQUEST_REPOSITORY.GET_REQUEST_BY_NIK_METHOD_NOT_IMPLEMENTED');
    }
    async getRequests(): Promise<any> {
        throw new Error('REQUEST_REPOSITORY.GET_REQUESTS_METHOD_NOT_IMPLEMENTED');
    }
    async updateStatus({request_id, process}: {request_id: string, process: PROCESS}): Promise<any> {
        throw new Error('REQUEST_REPOSITORY.UPDATE_STATUS_METHOD_NOT_IMPLEMENTED');
    }
}

export default RequestRepositoryAbstract;