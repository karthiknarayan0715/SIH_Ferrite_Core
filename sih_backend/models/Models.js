const {mongoose} = require("mongoose");
const {Decimal128} = require("mongodb");

const trainSchema = new mongoose.Schema({
    name: String,
    number: Number,
    max_weight: Decimal128,
    min_weight: Decimal128
});
const wagonSchema = new mongoose.Schema({
    measurement_id: Number,
    wagon_number: Number,
    wagon_weight: Decimal128,
    train: {type: mongoose.Schema.Types.ObjectId, ref: 'trains'}
})
// Create a mongoose model based on the schema
const Train = mongoose.model('trains', trainSchema);
const Wagon = mongoose.model('wagon', wagonSchema);
const CurrentData = {
    wagon_number: Number,
    wagon_distance: Decimal128,
    wagon_weight: Decimal128
}
let CurrentTrain = null;

let Distance = Number.POSITIVE_INFINITY;

const UpdateCurrentTrain = (train)=>{
    CurrentTrain = train.item
}
const GetCurrentTrain = ()=>{
    return CurrentTrain;
}
const GetDistance = ()=>{
    return Distance
}
const SetDistance = (_distance)=>{
    Distance = _distance;
}

let CurrentMId = 0
const SetCurrentMId = (MId)=>{
    CurrentMId = MId
}

let Connections = {}
let GetMeasurementId = async ()=>{
    const all_wagons = await Wagon.findOne({}, null, { sort: { _id: -1 } }, (err, lastDocument) => {
        if (err) {
            console.error(err);
        } else {
            console.log(lastDocument);
        }
    });
    console.log(all_wagons)
    let last_measurement_id = all_wagons.length === 0 ? parseInt(all_wagons[0].measurement_id()) : -1
    return last_measurement_id + 1
}

module.exports = {Connections, Train, Wagon, CurrentData, UpdateCurrentTrain, GetCurrentTrain, GetMeasurementId, CurrentMId, SetCurrentMId, GetDistance, SetDistance}