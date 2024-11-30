import express from 'express'
import activityLogMiddleware from './activityLog.middleware'
import activityLogController from './activityLog.controller'
import authenticationMiddleware from '../../middleware/authentication.middleware'

const router: express.Router = express.Router()

router.get('/boards/:id', authenticationMiddleware.authenticateToken(), activityLogMiddleware.isUserInBoard(), activityLogController.getActivityLog)

export default router