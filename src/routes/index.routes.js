import express from 'express'
import apisAuth from './apis/auth.routes.js'
import apisRoles from '/home/cules/Desktop/be-advanced/src/routes/apis/roles.routes.js'
const router = express.Router()

router.use('/api/auth', apisAuth)
router.use('/api/role', apisRoles)

export default router