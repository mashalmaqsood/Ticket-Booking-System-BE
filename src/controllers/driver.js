const { Driver } = require("../models");

const createDriver = async (req, res) => {
  const { name, phoneNumber, cnic, city, address, busId } = req.body;

  if (!name && !phoneNumber && !cnic && !busId) {
    return res.status(400).send({ message: "Requried fields not found." });
  }

  try {
    const response = await Driver.findOne({
      where: { cnic },
    });

    if (response) {
      return res.json({ message: "The driver already exists" });
    }

    await Driver.create({
      name,
      phoneNumber,
      cnic,
      city,
      address,
      busId,
    });

    return res.status(200).send({ message: "Driver created successfully" });
  } catch (err) {
    console.log("Error", err);
    res.status(500).send({ message: "Couldn't create new driver" });
  }
};

const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.findAll();
    return res.json(drivers);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Couldn't retrieve all drivers" });
  }
};

const deleteDriver = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ message: "Requried field not found." });
  }

  try {
    const driver = await Driver.findOne({
      where: { id },
    });
    await driver.destroy();
    return res.json({ message: "Driver deleted successfully" });
  } catch (err) {
    console.log("Error", err);
    res.status(500).send({ message: "Couldn't delete the driver" });
  }
};

const updateDriverById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ message: "Requried field not found." });
  }

  try {
    await Driver.update(req.body, {
      where: { id },
    });
    return res.json({ message: "Driver details updated successfully" });
  } catch (err) {
    console.log("Error", err);
    return res
      .status(500)
      .send({ message: "Couldn't update the driver details" });
  }
};

module.exports = {
  createDriver,
  getAllDrivers,
  deleteDriver,
  updateDriverById,
};
