import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import { getProductById, getProducts, deleteProductById } from '../controllers/productController.js'

const Router = express.Router()


Router.route('/').get(getProducts)
Router.route('/:id').get(getProductById).delete(protect, admin, deleteProductById)



export default Router