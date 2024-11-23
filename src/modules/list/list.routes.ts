import express from 'express'
import listController from './list.controller'
import listMiddleware from './list.middleware'
import authenticationMiddleware from '../../middleware/authentication.middleware'

const router: express.Router = express.Router()

router.route('/')
    .post(authenticationMiddleware.authenticateToken(), listMiddleware.isMemberInBoard(), listMiddleware.createList, listController.createList)
router.route('/:id')
    .get(authenticationMiddleware.authenticateToken(), listController.getById)
    .put(authenticationMiddleware.authenticateToken(), listMiddleware.updateList, listController.updateById)


export default router