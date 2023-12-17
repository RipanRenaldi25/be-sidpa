import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(!fs.existsSync('upload')) {
            fs.mkdirSync('upload');
        }
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