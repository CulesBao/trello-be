import express from 'express'
import authenticationMiddleware from '../../middleware/authentication.middleware'
import checkListMiddleware from './checkList.middleware'
import checkListController from './checkList.controller'
import { Permissions } from '../../common/enums/permissions.enum'

const router: express.Router = express.Router()

router.post('/', authenticationMiddleware.authenticateToken(),
    authenticationMiddleware.authorizePermissionBoard(Permissions.ADD_CHECKLIST_TO_CARD),
    checkListMiddleware.AddCheckList,
    checkListController.addCheckList)
router.route('/:checkListId')
    .put(authenticationMiddleware.authenticateToken(), authenticationMiddleware.authorizePermissionBoard(Permissions.ADD_CHECKLIST_TO_CARD), checkListMiddleware.UpdateCheckList, checkListController.updateCheckList)
    .delete(authenticationMiddleware.authenticateToken(), checkListController.deleteCheckList)
    .get(authenticationMiddleware.authenticateToken(), checkListController.getCheckList)

export default router