import express from 'express'
import apisAuth from './apis/auth.routes'
import apisRoles from './apis/roles.routes'

const router : express.Router = express.Router()

router.use('/api/auth', apisAuth)
router.use('/api/role', apisRoles)

export default router