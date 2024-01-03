const express= require("express")
const {createDriver,getAllDrivers,deleteDriver,updateDriverById}=require("../controllers/driver")
const authenticateAdmin = require('../middleware/adminAuthentication')
const router= express.Router();

router.post('/createDriver',authenticateAdmin,createDriver)
router.get('/getAllDrivers',authenticateAdmin,getAllDrivers)
router.delete('/deleteDriver/:id',authenticateAdmin,deleteDriver)
router.put('/updateDriverById/:id',authenticateAdmin,updateDriverById)

module.exports = router;