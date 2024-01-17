const {Connections, SetCurrentMId, Wagon} = require("../models/Models");
const StartMeasurements = async (ws, req) => {
    if (Object.keys(Connections).includes("esp32")){
        let _lastWagon = await Wagon.findLast()
        SetCurrentMId(_lastWagon.measurement_id + 1)
        Connections["esp32"].send("start")
    }
}

module.exports = {StartMeasurements}