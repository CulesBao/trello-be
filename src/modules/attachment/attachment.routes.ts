import express from 'express';
import attachmentController from './attachment.controller';
import attachmentMiddleware from './attachment.middleware';
import authenticationMiddleware from '../../middleware/authentication.middleware';
import { Permissions } from '../../common/enums/permissions.enum';

const router: express.Router = express.Router()

router.post('/', authenticationMiddleware.authenticateToken(), attachmentMiddleware.upload, authenticationMiddleware.authorizePermissionCardAndFile(Permissions.ADD_ATTACHMENT_TO_CARD),  attachmentController.upload)
router.route('/:id')
    .get(authenticationMiddleware.authenticateToken(), authenticationMiddleware.authorizePermissionCard(Permissions.GET_ATTACHMENT), attachmentController.findById)
    .delete(authenticationMiddleware.authenticateToken(), authenticationMiddleware.authorizePermissionCard(Permissions.REMOVE_ATTACHMENT_FROM_CARD), attachmentController.delete)

export default router