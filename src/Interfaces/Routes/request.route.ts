import express from 'express';
import uploadMidleware from '../Midlewares/MulterMidlware';
import googleBucketMidleware from '../Midlewares/googleBucketMidleware';
import requestsController from '../Controllers/requests.controller';

import { authorizationMidleware } from '../Midlewares/authMidleware';

const router = express.Router();

router.get('/', authorizationMidleware(["Admin"]), requestsController.getRequests);
router.get('/:request_id', authorizationMidleware(['Admin', 'User']), requestsController.getRequestByRequestId);
router.post('/', authorizationMidleware(['User']) ,uploadMidleware.array('image', 10), googleBucketMidleware, requestsController.uploadImage);


export default router;