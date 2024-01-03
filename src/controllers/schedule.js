const { Schedule } = require("../models");
const { Route } = require("../models");

const createSchedule = async (req, res) => {
  const { startingTime, endingTime, date, routeId } = req.body;
  if(!startingTime && !endingTime && !date && !routeId)
  {
    return res.status(400).json({message: 'Required fields not found.'})
  }

  try {
    const schedule = await Schedule.create({
      startingTime,
      endingTime,
      date,
      routeId,
      bookedSeats:[],
    });
    return res.json(schedule);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send({ message: "Couldn't create new schedule" });
  }
};

const getScheduleByRouteId = async (req, res) => {
  const { routeId, date} = req.params;

  if (!routeId && !date) {
    return res.status(400).json({message: 'Required fields not found.'})
  }
  
  
  try {
    const schedule = await Schedule.findAll({
      where: { routeId, date},
      include:[{ 
        model: Route, as: "schedules",
        include: "busroute"
      }]
    });
    if (schedule.length === 0) {
      return res.status(500).send({ message: "No schedules found for the specific route" });
    }
    return res.json(schedule);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send({ message: "Couldn't retrieve the schedules" });
  }
};

const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll();
    return res.json(schedules);
  } catch (err) {
    console.log("Error", err);
    return res.status(500).send({ message: "Couldn't retrieve the schedules" });
  }
};

const updateSchedule = async (req, res) => {
  const { id } = req.params;

  if(!id){
    return res.status(400).send({message : "Required field not found."});
  }

  try {
    await Schedule.update(req.body, {
      where: { id },
    });
    return res.json({ message: "Schedule details updated successfully" });
  } catch (err) {
    console.log("Error", err);
    return res.status(500).send({ message: "Couldn't update the schedule" });
  }
};

const deleteScheduleById = async (req, res) => {
  const { id } = req.params;

  if(!id){
    return res.status(400).send({message : "Required field not found."});
  }

  try {
    const schedule = await Schedule.findOne({
      where: { id },
    });
    await schedule.destroy();
    return res.json({ message: "Schedule deleted successfully" });
  } catch (err) {
    console.log("Error", err);
    return res.status(500).send({ message: "Couldn't delete the schedule" });
  }
};

module.exports = { 
  createSchedule, 
  getScheduleByRouteId,
  getAllSchedules,
  deleteScheduleById, 
  updateSchedule
};
