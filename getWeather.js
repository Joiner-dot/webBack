const Requests = require("./Requests/fetch");

module.exports = function (serv) {
serv.get("/weather/coordinates", (request, result) => {
    let lat = request.query.lat;
    let lon = request.query.lon;
    Requests.getByLogLat(lat, lon)
        .then(data => {
            result.send(data);
        })
        .catch(() => result.status(404).send("Not found"));
})

    serv.get("/weather/city", (request, result) => {
        let name = request.query.q;
        Requests.getByName(name)
            .then(data => {
                result.send(data);
            })
            .catch(() => result.status(404).send("Not found"));
    });
}