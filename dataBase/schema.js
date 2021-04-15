module.exports = function (mongoose) {
    let schema = mongoose.Schema;
    const citySchema = new schema({
        cityName:
            {type: "string", unique: true}
    }, {versionKey: false});
    return mongoose.model("cities", citySchema);
}