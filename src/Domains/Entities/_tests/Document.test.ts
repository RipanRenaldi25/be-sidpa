import Document from "../Document/Document";
import { JENISSURAT } from "../Document/IDocument";
/**
 * Should have correct props when instantiate object
 * should change props value when setter method called
 */ 


describe('Document Entities', () => {
    it('Should have correct props when instantiate object', () => {
        const doc = new Document('123', 'asd', JENISSURAT.DOMISILI, 'asd');

        expect(doc).toHaveProperty('id')
        expect(doc).toHaveProperty('title')
        expect(doc).toHaveProperty('type')
        expect(doc).toHaveProperty('url')
        expect(doc.id).toBe('123');
        expect(doc.title).toBe('asd');
        expect(doc.type).toBe(2);
        expect(doc.url).toBe('asd');
    })
    it('should change props value when setter method called', () => {
        const doc = new Document('123', 'asd', JENISSURAT.SURAT_SERBA_GUNA, 'asd');
        doc.id = 'id baru';
        doc.title = 'title baru';
        doc.type = JENISSURAT.SKU;
        doc.url = 'url baru'

        expect(doc.id).toBe('id baru');
        expect(doc.title).toBe('title baru');
        expect(doc.type).toBe(JENISSURAT.SKU);
        expect(doc.url).toBe('url baru');
    })
})