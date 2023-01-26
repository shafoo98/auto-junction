import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  resetUserPassword
} from '../controllers/userController.js'
import { protectRoute, admin } from '../middleware/authUserMiddleware.js'

router.route('/').post(registerUser).get(protectRoute, admin, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protectRoute, getUserProfile)
  .put(protectRoute, updateUserProfile)

router
  .route('/:id')
  .delete(protectRoute, admin, deleteUser)
  .get(protectRoute, admin, getUserById)
  .put(protectRoute, admin, updateUser)

router.route('/reset-password').post(resetUserPassword)

export default router
