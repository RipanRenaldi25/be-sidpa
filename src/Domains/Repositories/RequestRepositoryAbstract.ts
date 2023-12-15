/*istanbul ignore files */
abstract class RequestRepositoryAbstract {
    async requestDocuments(): Promise<any> {
        throw new Error('REQUEST_REPOSITORY.REQUEST_DOCUMENT_METHOD_NOT_IMPLEMENTED');
    }
}