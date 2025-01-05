import express from 'express'
import listController from './list.controller'
import listMiddleware from './list.middleware'
import authenticationMiddleware from '../../middleware/authentication.middleware'
import { Permissions } from '../../common/enums/permissions.enum'

const router: express.Router = express.Router()

router.route('/')
    .post(authenticationMiddleware.authenticateToken(), 
        authenticationMiddleware.authorizePermissionBoard(Permissions.CREATE_LIST),
        listMiddleware.createList, 
        listController.createList)
router.route('/:id')
    .get(authenticationMiddleware.authenticateToken(), 
        authenticationMiddleware.authorizePermissionList(Permissions.GET_LIST),
        listController.findById)
    .put(authenticationMiddleware.authenticateToken(),
        authenticationMiddleware.authorizePermissionList(Permissions.UPDATE_LIST),
        listMiddleware.updateList, 
        listController.updateById)


export default router