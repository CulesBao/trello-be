import authenticationMiddleware from '../../middleware/authentication.middleware'
import cardController from './card.controller'
import cardMidlleware from './card.middleware'
import express from 'express'

const router: express.Router = express.Router()

router.post('/', authenticationMiddleware.authenticateToken, cardMidlleware.isMemberInBoard(),  cardMidlleware.addCard, cardController.createCard)
router.route('/:id')
    .get(authenticationMiddleware.authenticateToken, cardMidlleware.isMemberInBoard(), cardController.getCardById)
    .put(authenticationMiddleware.authenticateToken, cardMidlleware.isMemberInBoard(), cardController.updateById)
    .delete(authenticationMiddleware.authenticateToken, cardMidlleware.isMemberInBoard(), cardController.deleteCardById)

export default router