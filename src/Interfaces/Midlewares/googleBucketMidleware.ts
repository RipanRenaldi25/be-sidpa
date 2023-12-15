import express from 'express';
import { Storage } from '@google-cloud/storage';


const googleBucketMidleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const storage = new Storage({
        keyFilename: 'service-account.json',
        projectId: process.env.PROJECT_ID!
    });
    const bucket = storage.bucket(process.env.BUCKET_NAME!);
    const files: any = req.files;
    const uploadedFiles = await files.map(async (file: any) => {
        await bucket.upload(file.path, {
            destination: `bkt-img-${file.filename}`
        });
    });
    next()
}

export default googleBucketMidleware;