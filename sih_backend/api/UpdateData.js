const {CurrentData, Connections, Wagon} = require("../models/Models");
let GetCurrentTrain = require("../models/Models").GetCurrentTrain
const UpdateData = async (ws, req) => {
    CurrentData.wagon_number = req.data.wagon_number;
    CurrentData.wagon_speed = req.data.wagon_speed;
    CurrentData.wagon_weight = req.data.wagon_weight;
    const new_wagon = new Wagon({
        number: CurrentData.wagon_number,
        weight: CurrentData.wagon_weight,
        speed: CurrentData.wagon_speed,
        train: GetCurrentTrain()._id
        })
    await new_wagon.save();
    Connections['frontend'].send(
        JSON.stringify({
            type: "current_data",
            data: {
                wagon_number: CurrentData.wagon_number,
                wagon_speed: CurrentData.wagon_speed,
                wagon_weight: CurrentData.wagon_weight
            }
    }))

    console.log(CurrentData)
}

module.exports = {UpdateData}