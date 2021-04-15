const Requests = require("./Requests/fetch");
const citySchema = require("./dataBase/schema");

module.exports = function (serv, mongoose) {
    const favouriteFunc = citySchema(mongoose);

    serv.post("/favourites", async (request, result) => {
        Requests.getByName(request.query.q)
            .then(async data => {
                let city;
                let exception;
                await favouriteFunc.find({cityName: data.name})
                    .then(value => city = value[0])
                    .catch(e => exception = e);
                if (city !== undefined) {
                    result.status(600).send("City already in the list");
                    return;
                } else if (exception) {
                    result.status(666);
                    return;
                }
                result.send(data);
                new favouriteFunc({cityName: data.name}).save();
            })
            .catch(() => result.status(404).send("Not found"));
    });

    serv.get("/favourites", async (request, result) => {
        let getCities = undefined;
        let exception = undefined;
        let cities = [];
        await favouriteFunc.find()
            .then(value => getCities = value)
            .catch(e => exception = e);
        if (exception) {
            result.status(666);
            return;
        }
        getCities.forEach(info => cities.push(info.cityName));
        result.send({favouriteCities: cities})
    });

    serv.delete("/favourites", async (request, result) => {
        let exception;
        await favouriteFunc.findOneAndRemove({cityName: request.query.q})
            .catch(e => exception = e);
        if (exception) {
            result.status(500).send();
            return;
        }
        result.send();
    });
};