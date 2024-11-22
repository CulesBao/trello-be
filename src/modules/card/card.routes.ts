import cardController from './card.controller'
import express from 'express'

const router: express.Router = express.Router()

router.post('/', cardController.createCard)
router.route('/:id')
    .get(cardController.getCardById)
    .put(cardController.updateById)
    .delete(cardController.deleteCardById)

