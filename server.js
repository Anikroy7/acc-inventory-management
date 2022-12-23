const mongoose = require("mongoose");
const app = require('./app');
const colors = require('colors');
require('dotenv').config()

// database connetion
mongoose.connect(process.env.DATABASE_LOCAL)
    .then(() => {
        console.log("Database connetion is successfull".bgGreen);
    })
    .catch((err) => {
        console.log("Database error", err);
    })


// server

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Yay!!! Inventory server is running on port ${port}`.bgMagenta.bold)
})
