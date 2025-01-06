import express from 'express'
import notificationMiddleware from './notification.middleware'
import authenticationMiddleware from '../../middleware/authentication.middleware'
import notificationController from './notification.controller'

const router: express.Router = express.Router()
router.get('/', authenticationMiddleware.authenticateToken(), notificationMiddleware.setUpRequestHeader(), notificationController.addClient.bind(notificationController))
export default router