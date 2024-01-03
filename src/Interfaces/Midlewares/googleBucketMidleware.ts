import express from 'express';
import { Storage } from '@google-cloud/storage';


const googleBucketMidleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const storage = new Storage({
        keyFilename: 'sa.json',
        projectId: process.env.PROJECT_ID!
    });
    const bucket = storage.bucket(process.env.BUCKET_NAME!);
    const files: any = req.files;
    await files.map(async (file: any) => {
        await bucket.upload(file.path, {
            destination: `bkt-img-${file.filename}`
        });
    });
    next()
}

export default googleBucketMidleware;