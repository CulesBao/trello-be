import express from 'express'
import rolesController from '../../controller/roles.controller.js'
const router = express.Router()

router.post('/create-role', rolesController.createRole)
router.get('/get-roles', rolesController.getAllRoles)

export default router