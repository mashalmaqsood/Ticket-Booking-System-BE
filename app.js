const express = require("express")
require('dotenv').config()

const {sequelize} = require('./src/models')
const user = require('./src/routes/user')
const bus= require('./src/routes/bus')
const driver= require('./src/routes/driver')
const terminal=require('./src/routes/terminal')
const route=require('./src/routes/route')
const schedule=require('./src/routes/schedule')
const booking=require('./src/routes/booking')

const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.json({ limit: "100mb" }));

app.use('/users',user)
app.use('/bus',bus)
app.use('/driver',driver)
app.use('/terminal',terminal)
app.use('/route',route)
app.use('/schedule',schedule)
app.use('/booking',booking)

app.listen({ port: 5000 }, async () => {
    console.log("server up on http://localhost:5000");
    await sequelize.authenticate();
    console.log("Database connected!");
});