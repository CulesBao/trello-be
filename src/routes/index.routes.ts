import express from 'express'
import apisAuth from '../modules/auth/auth.routes'
import apisRoles from '../modules/roles/roles.routes'
import apisPermissions from '../modules/permissions/permissions.routes'
import apisUser from '../modules/user/user.routes'
import apiWorkSpace from '../modules/workspace/workspace.routes'
import apiBoard from '../modules/board/board.routes'
import apiLists from '../modules/list/list.routes'

const router: express.Router = express.Router()

router.use('/api/auth', apisAuth)
router.use('/api/roles', apisRoles)
router.use('/api/permissions', apisPermissions)
router.use('/api/user', apisUser)
router.use('/api/workspaces', apiWorkSpace)
router.use('/api/boards', apiBoard)
router.use('/api/lists', apiLists)
export default router