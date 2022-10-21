const colors = require('colors');
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();

const app = require('./app');

// database connetion

mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
    console.log("Database connetion is successfull".bgGreen);
});


// server

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Yay!!! Inventory server is running on port ${port}`.bgMagenta.bold)
})
