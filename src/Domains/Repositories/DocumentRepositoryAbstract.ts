/**istanbul ignore files */

import IDocument from "../Entities/Document/IDocument";

abstract class DocumentRepositoryAbstract {
    async insertMultipleDocuments(documents: IDocument[], nik: string): Promise<void> {
        throw new Error('DOCUMENT_REPOSITORY.INSERT_MULTIPLE_DOCUMENTS_METHOD_NOT_IMPLEMENTED');
    }
    async getUserDocuments(nik: string){
        throw new Error('DOCUMENT_REPOSITORY.GET_USER_DOCUMENTS_METHOD_NOT_IMPLEMENTED');
    }
};


export default DocumentRepositoryAbstract;