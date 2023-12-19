const {mongoose} = require("mongoose");
const {Decimal128} = require("mongodb");

const trainSchema = new mongoose.Schema({
    name: String,
    number: Number,
    max_weight: Decimal128,
    min_weight: Decimal128
});
const wagonSchema = new mongoose.Schema({
    number: Number,
    weight: Decimal128,
    speed: Decimal128,
    train: {type: mongoose.Schema.Types.ObjectId, ref: 'trains'}
})

// Create a mongoose model based on the schema
const Train = mongoose.model('trains', trainSchema);
const Wagon = mongoose.model('wagon', wagonSchema);
const CurrentData = {
    wagon_number: Number,
    wagon_speed: Decimal128,
    wagon_weight: Decimal128
}
let CurrentTrain = null;

const UpdateCurrentTrain = (train)=>{
    CurrentTrain = train.item
    console.log(CurrentTrain)
}
const GetCurrentTrain = ()=>{
    return CurrentTrain;
}

let Connections = {}

module.exports = {Connections, Train, Wagon, CurrentData, UpdateCurrentTrain, GetCurrentTrain}