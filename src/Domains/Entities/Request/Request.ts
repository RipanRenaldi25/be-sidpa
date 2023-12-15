import IRequest from "./IRequest";
import { PROCESS } from "./IRequest";
import Document from "../Document/Document";

class Request implements IRequest {
    private _process: PROCESS;
    private _documents: Document[];
    private _nik: string;

    constructor(builder: RequestBuilder) {
        this._nik = builder.getNik();
        this._process = builder.getProcess();
        this._documents = builder.getDocuments();
    }
    
    get nik(): string {
        return this._nik;
    }

    get documents(): Document[] {
        if(!this._documents) {
            return []
        }
        return this._documents;
    }
    set nik(nik: string) {
        this._nik = nik;
    }
 
    get process(): PROCESS {
        return this._process
    }
    set process(process: PROCESS) {
        this._process = process;
    }
    set documents(document: Document[]) {
        document.forEach(document => {
            this._documents.push(document);
        })
    }

};

class RequestBuilder implements IRequest {
    process: PROCESS = PROCESS.UNPROCESS;
    documents: Document[] = [];
    constructor(public nik: string) {}

    getProcess(): PROCESS {
        return this.process
    }
    getNik(): string {
        return this.nik;
    }
    getDocuments(): Document[] {
        return this.documents;
    }

    setDocuments(documents: Document[]) {
        documents.forEach(document => {
            this.documents.push(document)
        })
        return this;
    }
    setProcess(process: PROCESS) {
        this.process = process;
        return this;
    }
    setNik(nik: string) {
        this.nik = nik;
        return this;
    }
    
    build(): Request {
        return new Request(this);
    }
}
export {RequestBuilder}
export default Request;