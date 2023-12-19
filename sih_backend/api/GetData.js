const {Train, Wagon} = require("../models/Models")
const GetData = async (ws, req) => {
    const trains_data = await Train.find().lean();

    const trains = []
    for(let i=0; i<trains_data.length; i++){
        const wagon_data = await Wagon.find({train: trains_data[i]._id})
        trains.push({...trains_data[i], wagons: wagon_data})
    }
    ws.send(JSON.stringify({
        type: "data",
        data: {
            data:trains
        }
    }))
}

module.exports = {GetData}