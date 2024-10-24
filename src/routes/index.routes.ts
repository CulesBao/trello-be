import express from 'express'
import apisAuth from '../apis/auth/auth.routes'
import apisRoles from '../apis/roles/roles.routes'
import apisPermissions from '../apis/permissions/permissions.routes'

const router: express.Router = express.Router()

router.use('/api/auth', apisAuth)
router.use('/api/roles', apisRoles)
router.use('/api/permissions', apisPermissions)

export default router