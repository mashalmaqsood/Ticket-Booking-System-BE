const { Booking } = require("../models");
const {Bus}=require("../models")
const {Schedule}=require("../models")

const createBooking = async (req, res) => {
  const { seatsBooked, userId, scheduleId, busId } = req.body;

  if(!seatsBooked && !userId && !scheduleId && !busId)
  {
    return res.status(404).send({message : "Required field not found."});
  }
  
  try {
    const bus = await Bus.findOne({
        where : {id : busId }
    })
    const schedule = await Schedule.findOne({
      where : {id : scheduleId}
    })
    const totalAmount = bus.price * seatsBooked.length;  
    await Booking.create({
      seatsBooked,
      totalAmount,
      userId,
      scheduleId,
      busId,
    });
    const updatedBookedSeats = schedule.bookedSeats.concat(seatsBooked);
    await Schedule.update({bookedSeats :updatedBookedSeats }, {where : {id : scheduleId}})
    return res.status(200).send({ message: "Booking created successfully" });
  } catch (err) {
    console.log("Error", err);
    return res.status(500).send({ message: "Couldn't create the booking" });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    return res.json(bookings);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Couldn't retrieve all bookings" });
  }
};

const getBookingByUserId = async(req,res) =>{
  const {id} = req.params;

  if(!id){
    return res.status(404).send({message : "Required field not found."});
  }

  try{
    const bookings = await Booking.findAll({
      where : { userId : id},
      include:[{ 
        model: Schedule, as: "scheduleBooking",
        include: "schedules"
      },
      {
        model : Bus, as: "busBooking"
      }]
    })
    return res.json(bookings);
  } catch(err){
    console.log("Error", err);
    res.status(500).send({ message: "Couldn't retrieve the bookings" });
  }
} 

module.exports = {
  createBooking,
  getAllBookings,
  getBookingByUserId
};
