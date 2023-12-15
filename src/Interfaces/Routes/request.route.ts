import express from 'express';
import uploadMidleware from '../Midlewares/MulterMidlware';
import googleBucketMidleware from '../Midlewares/googleBucketMidleware';
import requestsController from '../Controllers/requests.controller';

const router = express.Router();

router.post('/', uploadMidleware.array('image', 10), googleBucketMidleware, requestsController.uploadImage);


export default router;