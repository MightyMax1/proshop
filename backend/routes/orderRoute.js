import express from 'express'
import { addOrderItems, getOrders, getOrderById, updateOrderToPaid, getMyOrders } from '../controllers/orderController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const Router = express.Router()

Router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
Router.route('/myorders').get(protect, getMyOrders)
Router.route('/:id').get(protect, getOrderById)
Router.route('/:id/pay').put(protect, updateOrderToPaid)

export default Router