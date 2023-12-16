import Document from "../Document/Document";
import { JENISSURAT } from "../Document/IDocument";
/**
 * Should have correct props when instantiate object
 * should change props value when setter method called
 */ 


describe('Document Entities', () => {
    it('Should have correct props when instantiate object', () => {
        const doc = new Document('123', JENISSURAT.DOMISILI, 'asd', '123');
        

        expect(doc).toHaveProperty('title')
        expect(doc).toHaveProperty('type')
        expect(doc).toHaveProperty('url')
        expect(doc).toHaveProperty('nik')
        expect(doc.title).toBe('123');
        expect(doc.type).toBe(JENISSURAT.DOMISILI);
        expect(doc.url).toBe('asd');
        expect(doc.nik).toBe('123');
    })
    it('should change props value when setter method called', () => {
        const doc = new Document('123', JENISSURAT.DOMISILI, 'asd', '123');

        doc.title = 'title baru';
        doc.type = JENISSURAT.SKU;
        doc.url = 'url baru'
        doc.nik = 'nik baru';

        expect(doc.nik).toBe('nik baru');
        expect(doc.title).toBe('title baru');
        expect(doc.type).toBe(JENISSURAT.SKU);
        expect(doc.url).toBe('url baru');
    })
})