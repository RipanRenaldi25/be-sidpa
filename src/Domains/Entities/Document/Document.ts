import IDocument, { JENISSURAT } from "./IDocument";


class Document implements IDocument {
    constructor(private _id: string, private _title: string, private _type: JENISSURAT, private _url: string) {}

    get id (): string {
        return this._id;
    }
    get title(): string {
        return this._title;
    }
    get type(): JENISSURAT {
        return this._type;
    }
    get url(): string {
        return this._url;
    }

    set id(id: string) {
        this._id = id;
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