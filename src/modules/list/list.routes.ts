import express from 'express'
import listController from './list.controller'
const router: express.Router = express.Router()

router.route('/')
    .post(listController.createList)
router.route('/:id')
    .get(listController.getById)
    .put(listController.updateById)

router.get('/:id/cards', listController.getAllCard)
router.get('/:id/board', listController.getBoardParent)
router.put('/:id/:field', listController.updateAFiledOnList)

export default router