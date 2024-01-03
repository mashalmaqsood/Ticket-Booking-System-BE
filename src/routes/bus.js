const express= require("express")
const {createBus,updateBus,getAllbuses,deleteBus,getBusByBusId}=require("../controllers/bus")
const authenticateAdmin =require('../middleware/adminAuthentication')
const aunthenticateUser = require('../middleware/auth')
const router= express.Router();

router.post('/createBus',authenticateAdmin,createBus)
router.put('/updateBus/:id',authenticateAdmin,updateBus)
router.get('/getAllbuses',authenticateAdmin,getAllbuses)
router.delete('/deleteBus/:id',authenticateAdmin,deleteBus)
router.get('/getBusByBusId/:id',aunthenticateUser,getBusByBusId)

module.exports = router;