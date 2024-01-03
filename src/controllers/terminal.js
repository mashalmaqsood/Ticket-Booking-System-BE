const { Terminal } = require("../models");

const createTerminal = async (req, res) => {
  const { city, image, address, phoneNo } = req.body;

  if(!city && !image && !address && !phoneNo){
      return res.status(400).send({message : "Required fields not found."});  
  }

  try {
    await Terminal.create({
      city,
      image,
      address,
      phoneNo,
    });
    return res.status(200).send({ message: "Terminal created successfully" });
  } catch (err) {
    console.log("Error", err);
    res.status(500).send({ message: "Couldn't create the terminal" });
  }
};

const getAllTerminals = async (req, res) => {
  try {
    const terminals = await Terminal.findAll();
    return res.json(terminals);
  } catch (err) {
      console.log("Error", err);
      return res.status(500).send({ message: "Couldn't retrieve all terminals" });
  }
};

const updateTerminal = async (req, res) => {
  const { id } = req.params;

  if(!id){
    return res.status(400).send({message : "Required field not found."});
  }

  try {
    await Terminal.update(req.body, {
      where: { id },
    });
    return res.status(200).json({ message: "Terminal details updated successfully" });
  } catch (err) {
    console.log("Error", err);
    return res.status(500).send({ message: "Couldn't update the terminal" });
  }
};

module.exports = { 
 createTerminal,
 getAllTerminals,
 updateTerminal
};
