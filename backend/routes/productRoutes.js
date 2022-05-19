// The routes that are related to products

// The routes are made from the product controllers functions

import express from 'express'
const router = express.Router()
import {
  deleteProduct,
  getProductById,
  getProducts,
  editProduct,
  createProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js'
import { protectRoute, admin } from '../middleware/authUserMiddleware.js'

router.route('/').get(getProducts).post(protectRoute, admin, createProduct)
router.route('/:id/reviews').post(protectRoute, createProductReview)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protectRoute, admin, deleteProduct)
  .put(protectRoute, admin, editProduct)

export default router
