const { Route } = require("../models");

const createRoute = async (req, res) => {
  const { origin, destination, distance, duration, busId } = req.body;

  if(!origin && !destination && !duration && !distance && !busId)
  {
      return res.status(400).send({message : "Required fields not found."});
  }

  try {
    const route = await Route.create({
      origin,
      destination,
      distance,
      duration,
      busId,
    });
    return res.json(route);
  } catch (err) {
      console.log("error", err);
      res.status(500).send({ message: "Couldn't create the route" });
  }
};

const getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.findAll();
    return res.json(routes); 
  } catch (err) {
    console.log("Error", err);
    res.status(500).send({ message: "Couldn't retrieve the routes" });
  }
};

const getRouteByRouteId = async(req,res) =>{
    const {RouteId}=req.params;

    if(!RouteId){
      return res.status(400).send({message : "Required field not found."});
    }

    try {
        const route = await Route.findOne({
            where : {id: RouteId},
            include: "busroute",
        })
        return res.json(route)
    }catch(err){
     console.log("Error", err);
     res.status(500).send({ message: "Couldn't retrieve the route" });
    }
}

const updateRouteById = async (req, res) => {
  const { id } = req.params;

  if(!id){
    return res.status(400).send({message : "Requried field not found."});
  }

  try {
    await Route.update(req.body, {
      where: { id },
    });
    return res.json({ message: "Route details updated successfully" });
  } catch (err) {
      console.log("Error", err);
      return res.status(500).send({ message: "Couldn't update the Route" });
  }
};

const deleteRouteById = async (req, res) => {
  const { id } = req.params;

  if(!id){
    return res.status(400).send({message : "Requried field not found."});
  }

  try {
    const route = await Route.findOne({
      where: { id },
    });
    await route.destroy();
    return res.json({ message: "Route deleted successfully" });
  } catch (err) {
    console.log("Error", err);
    return res.status(500).send({ message: "Couldn't delete the Route" });
  }
};

module.exports = { 
  createRoute,
  getAllRoutes,
  getRouteByRouteId,
  updateRouteById,
  deleteRouteById
};
