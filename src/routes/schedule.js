const express = require("express");
const {
  createSchedule,
  getScheduleByRouteId,
  getAllSchedules,
  deleteScheduleById,
  updateSchedule,
} = require("../controllers/schedule");
const authenticateUser = require("../middleware/auth");
const adminAuthentication=require("../middleware/adminAuthentication")
const router = express.Router();

router.post("/createSchedule", adminAuthentication,createSchedule);
router.get("/getScheduleByRouteId/:routeId/:date",authenticateUser,getScheduleByRouteId);
router.get("/getAllSchedules", adminAuthentication,getAllSchedules);
router.delete("/deleteScheduleById/:id",adminAuthentication,deleteScheduleById);
router.put("/updateSchedule/:id",adminAuthentication,updateSchedule);

module.exports = router;
