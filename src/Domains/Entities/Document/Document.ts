import IDocument, { JENISSURAT } from "./IDocument";


class Document implements IDocument {
    constructor(private _title: string, private _type: JENISSURAT, private _url: string, private _nik: string) {}

    get title(): string {
        return this._title;
    }
    get type(): JENISSURAT {
        return this._type;
    }
    get url(): string {
        return this._url;
    }
    get nik(): string {
        return this._nik
    }

    set nik(nik) {
        this._nik = nik;
    }
    set title(title: string) {
        this._title = title;
    }
    set type(type: JENISSURAT) {
        this._type = type
    }
    set url(url: string){
        this._url = url;
    }
}

export default Document;