enum JENISSURAT {
    SURAT_KEMATIAN="SURAT_KEMATIAN" ,
    SKU ="SKU",
    DOMISILI="DOMISILI",
    KETERANGAN_LAHIR="KETERANGAN_LAHIR",
    SURAT_PINDAH="SURAT_PINDAH",
    SURAT_SERBA_GUNA="SURAT_SERBA_GUNA"
}

interface IDocument {
    title: string;
    type: JENISSURAT;
    url: string
}
export { JENISSURAT }

export default IDocument;