/**istanbul ignore files */

import IDocument from "../Entities/Document/IDocument";

abstract class DocumentRepositoryAbstract {
    async getUserRequestDocuments(nik: string): Promise<any> {
        throw new Error('DOCUMENT_REPOSITORY.GET_USER_REQUESTS_DOCUMENTS_METHOD_NOT_IMPLEMENTED');
    }
};


export default DocumentRepositoryAbstract;