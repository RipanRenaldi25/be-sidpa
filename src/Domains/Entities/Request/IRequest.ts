import Document from "../Document/Document";

export enum PROCESS {
    UNPROCESS="UNPROCESS",
    PROCESS="PROCESS",
    PROCESSED="PROCESSED"
}

interface IRequest {
    process: PROCESS,
    nik: string,
    documents: Document[]
};

export default IRequest;