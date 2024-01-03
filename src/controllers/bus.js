const { Bus } = require("../models");

const createBus = async (req, res) => {
  const { number, busType, totalSeats, image, price } = req.body;

  if(!number && !busType && !totalSeats && !image && !price){
    return res.status(400).send({message : "Requried fields not found."});
  }
  
  try {
    const busNumber = await Bus.findOne({
      where: { number },
    });
    if (busNumber) {
      return res.json({ message: "The bus already exists" });
    }
    await Bus.create({
      number,
      busType,
      totalSeats,
      image,
      price,
    });
    return res.status(200).send({ message: "Bus created successfully" });
  } catch (err) {
    console.log("Error", err);
    return res.status(500).send({ message: "Couldn't create the bus" });
  }
};

const updateBus = async (req, res) => {
  const { id } = req.params;

  if(!id){
    return res.status(400).send({message : "Requried field not found."});
  }

  try {
    await Bus.update(req.body, {
      where: { id },
    });
    return res.json({ message: "Bus details updated successfully" });
  } catch (err) {
    console.log("Error", err);
    return res.status(500).send({ message: "Couldn't update the bus" });
  }
};

const getAllbuses = async (req, res) => {
  try {
    const buses = await Bus.findAll();
    return res.json(buses);
  } catch (err) {
    console.log("Error", err);
    return res.status(500).send({ message: "Couldn't retrieve the buses" });
  }
};

const getBusByBusId = async (req, res) => {
  const { id } = req.params;

  if(!id){
    return res.status(400).send({message : "Requried field not found."});
  }

  try {
    const bus = await Bus.findOne({
      where: { id },
    });
    return res.json(bus);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send({ message: "Couldn't retrieve the bus" });
  }
};

const deleteBus = async (req, res) => {
  const { id } = req.params;

  if(!id){
    return res.status(400).send({message : "Requried field not found."});
  }

  try {
    const bus = await Bus.findOne({
      where: { id },
    });
    await bus.destroy();
    return res.json({ message: "Bus deleted successfully" });
  } catch (err) {
    console.log("Error", err);
    return res.status(500).send({ message: "Couldn't delete the bus" });
  }
};

module.exports = {
  createBus,
  updateBus,
  getAllbuses,
  deleteBus,
  getBusByBusId,
};
