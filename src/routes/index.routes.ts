import express from 'express'
import apisAuth from './apis/auth.routes.js'
import apisRoles from './apis/roles.routes.js'

const router : express.Router = express.Router()

router.use('/api/auth', apisAuth)
router.use('/api/role', apisRoles)

export default router