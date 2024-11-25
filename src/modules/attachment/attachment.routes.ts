import express from 'express';
import attachmentController from './attachment.controller';
import attachmentMiddleware from './attachment.middleware';
import authenticationMiddleware from '../../middleware/authentication.middleware';

const router: express.Router = express.Router()

router.post('/',authenticationMiddleware.authenticateToken(), attachmentMiddleware.upload, attachmentMiddleware.isUserInBoard(), attachmentController.upload)
router.route('/:id')
    .get(authenticationMiddleware.authenticateToken(), attachmentMiddleware.isUserInBoard(), attachmentController.findById)
    .delete(authenticationMiddleware.authenticateToken(), attachmentController.delete)

export default router