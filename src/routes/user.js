const express= require("express")
const {createUser,loginUser,getUserById,updateUser,forgotPassword,resetPassword,emailVerification }=require("../controllers/user")
const userauth = require("../middleware/userauth")
const router= express.Router();

router.post('/createUser',createUser)
router.post('/loginUser',loginUser)
router.post('/forgotPassword',forgotPassword)
router.post('/resetPassword/:id/:token',resetPassword)
router.get('/getUserById/:id',userauth,getUserById)
router.put('/updateUser/:id',updateUser )
router.get('/emailVerification/:id/verify/:token',emailVerification)
module.exports = router;