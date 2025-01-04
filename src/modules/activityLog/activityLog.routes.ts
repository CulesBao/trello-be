import express from 'express'
import activityLogController from './activityLog.controller'
import authenticationMiddleware from '../../middleware/authentication.middleware'
import { Permissions } from '../../common/enums/permissions.enum'

const router: express.Router = express.Router()

router.get('/boards/:id', authenticationMiddleware.authenticateToken(), authenticationMiddleware.authorizePermissionBoard(Permissions.GET_BOARD), activityLogController.getActivityLog)

export default router