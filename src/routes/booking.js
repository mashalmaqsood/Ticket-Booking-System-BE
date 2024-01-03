const express= require("express")
const {createBooking, getAllBookings,getBookingByUserId}=require("../controllers/booking")
const authenticateUser = require('../middleware/auth')
const authenticateAdmin =require('../middleware/adminAuthentication')
const router= express.Router();

router.post('/createBooking',authenticateUser,createBooking)
router.get('/getAllBookings',authenticateAdmin,getAllBookings)
router.get('/getBookingByUserId/:id', authenticateUser,getBookingByUserId)

module.exports = router;