const express= require("express")
const {createRoute,getAllRoutes,getRouteByRouteId,updateRouteById,deleteRouteById}=require("../controllers/route")
const authenticateUser = require('../middleware/auth');
const adminAuthentication = require('../middleware/adminAuthentication');
const userauth = require("../middleware/userauth")
const router= express.Router();

router.post('/createRoute',adminAuthentication,createRoute)
router.get('/getAllRoutes',userauth,getAllRoutes)
router.get('/getRouteByRouteId/:RouteId', authenticateUser,getRouteByRouteId)
router.put('/updateRouteById/:id',adminAuthentication,updateRouteById)
router.delete('/deleteRouteById/:id',adminAuthentication,deleteRouteById)
module.exports = router;