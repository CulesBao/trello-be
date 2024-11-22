import express from 'express'
import listController from './list.controller'
import listMiddleware from './list.middleware'
import boardMiddleware from '../board/board.middleware'
import authenticationMiddleware from '../../middleware/authentication.middleware'
import workspaceMiddleware from '../workspace/workspace.middleware'
import { WorkspaceEnum } from '../../types/workspace'
const router: express.Router = express.Router()

router.route('/')
    .post(listMiddleware.createList, listMiddleware.createList, listController.createList)
router.route('/:id')
    .get(listMiddleware.getParent(), boardMiddleware.getParent(), authenticationMiddleware.authenticateToken, workspaceMiddleware.checkRole(WorkspaceEnum.MEMBER), listController.getById)
    .put(listMiddleware.getParent(), boardMiddleware.getParent(), authenticationMiddleware.authenticateToken, workspaceMiddleware.checkRole(WorkspaceEnum.MEMBER), listController.updateById)

// router.get('/:id/cards', listController.getAllCard)
// router.get('/:id/board', listController.getBoardParent)

export default router