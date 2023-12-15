/**istanbul ignore files */
enum JENISSURAT {
    SURAT_KEMATIAN ,
    SKU ,
    DOMISILI,
    KETERANGAN_LAHIR,
    SURAT_PINDAH,
    SURAT_SERBA_GUNA 
}

interface IDocument {
    id: string;
    title: string;
    type: JENISSURAT;
    url: string
}
export { JENISSURAT }

export default IDocument;