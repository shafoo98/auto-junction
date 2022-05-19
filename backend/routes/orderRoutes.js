import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
  deleteOrder,
} from '../controllers/placeOrderController.js'
import { protectRoute, admin } from '../middleware/authUserMiddleware.js'

router
  .route('/')
  .post(protectRoute, addOrderItems)
  .get(protectRoute, admin, getOrders)
router.route('/myorders').get(protectRoute, getMyOrders)
router.route('/:id').delete(protectRoute, admin, deleteOrder)
router.route('/:id').get(protectRoute, getOrderById)
router.route('/:id/pay').put(protectRoute, admin, updateOrderToPaid)
router.route('/:id/deliver').put(protectRoute, admin, updateOrderToDelivered)

export default router
