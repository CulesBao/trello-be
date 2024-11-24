import express from 'express'
import authenticationMiddleware from '../../middleware/authentication.middleware'
import checkListMiddleware from './checkList.middleware'
import checkListController from './checkList.controller'

const router: express.Router = express.Router()

router.post('/', authenticationMiddleware.authenticateToken(), checkListMiddleware.AddCheckList, checkListMiddleware.isUserInBoard(), checkListController.addCheckList)
router.route('/:checkListId')
    .put(authenticationMiddleware.authenticateToken(), checkListMiddleware.UpdateCheckList, checkListController.updateCheckList)
    .delete(authenticationMiddleware.authenticateToken(), checkListController.deleteCheckList)
    .get(authenticationMiddleware.authenticateToken(), checkListController.getCheckList)

export default router