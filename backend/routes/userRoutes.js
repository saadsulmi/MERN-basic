const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getProfile,
  updateUser
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/profile', protect, getProfile)
router.put('/update', protect,updateUser)

module.exports = router
