const req = require("node-fetch");
const urlConfig = require("./config");

async function getCity(values) {
    let url = new URL(urlConfig.url);
    url.searchParams.append("appid", urlConfig.appid);
    url.searchParams.append("units", "metric");
    for (const key in values) {
        url.searchParams.append(key, values[key]);
    }
    let data = await req(url);
    if (data.status === 200) {
        return await data.json();
    } else {
        throw new Error(`Bad request ${data.status}`);
    }
}

async function getByLogLat(lat, lon) {
    return getCity({lat: lat, lon: lon});
}

async function getByName(name) {
    return getCity({q: name});
}


module.exports.getByName = getByName;
module.exports.getByLogLat = getByLogLat;
