const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const port = config.port;
const url = config.url;
const cors = require("cors");
const methods = require("./citiesWeather");
const serv = express();


serv.use(cors());
mongoose.set("useCreateIndex", true);
mongoose.connect(url,
    {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false})
    .then((mongoose) => {
        methods.citiesWeather(serv, mongoose);
        serv.listen(port, () => {
            console.log("Success")
        })
    })
    .catch(console.log);