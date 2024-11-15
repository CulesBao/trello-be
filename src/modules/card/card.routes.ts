import cardController from './card.controller'
import express from 'express'

const router: express.Router = express.Router()

router.post('/', cardController.createCard)
router.route('/:id')
    .get(cardController.getCardById)
    .put(cardController.updateById)
    .delete(cardController.deleteCardById)
router.get('/:id/:field', cardController.getFieldOnCard)

router.route('/:id/attachments')
    .get(cardController.getAttachmentsOnCard)
    .post(cardController.addNewAttachmentOnCard)
router.route('/:id/attachment')
    .get(cardController.getAttachmentOnCard)
    .put(cardController.updateAttachmentOnCard)
    .delete(cardController.deleteAttachmentById)

