import express from 'express'
import { createBook } from '../controller/book_controller.js'

const router = express.Router()

router.get('/', createBook)

export default router
