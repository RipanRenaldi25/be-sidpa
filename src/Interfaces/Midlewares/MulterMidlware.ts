import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'upload');
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        const fileNameToSave = `file-${+new Date()}-${originalname}`
        cb(null, fileNameToSave);
    }
})

const upload = multer({
    storage
});

export default upload;