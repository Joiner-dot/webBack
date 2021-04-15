const weather = require("./getWeather");
const favourites = require("./listCities");

function serverMethods(serv, mongoose) {
    weather(serv);
    favourites(serv, mongoose);
}
module.exports.citiesWeather = serverMethods;