const {CurrentData, Connections, Wagon, GetMeasurementId, SetDistance} = require("../models/Models");
let GetCurrentTrain = require("../models/Models").GetCurrentTrain
const UpdateData = async (ws, req) => {
    CurrentData.wagon_number = req.data.wagon_number;
    CurrentData.wagon_weight = req.data.wagon_weight;
    if (GetCurrentTrain() == null){
        console.log("No train selected!")
        return
    }
    const measurement_id = await GetMeasurementId();
    console.log(GetCurrentTrain()._id, CurrentData.wagon_number, CurrentData.wagon_weight, measurement_id)
    const new_wagon = new Wagon({
        measurement_id: measurement_id,
        number: CurrentData.wagon_number,
        weight: CurrentData.wagon_weight,
        train: GetCurrentTrain()._id
        })
    await new_wagon.save();
    Connections['frontend'].send(
        JSON.stringify({
            type: "current_data",
            data: {
                measurement_id: GetMeasurementId(),
                wagon_number: CurrentData.wagon_number,
                wagon_weight: CurrentData.wagon_weight
            }
    }))
}

module.exports = {UpdateData}