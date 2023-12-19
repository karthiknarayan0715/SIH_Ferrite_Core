const {Connections} = require("../models/Models");
const StartMeasurements = (ws, req) => {
    if (Object.keys(Connections).includes("esp32")){
        Connections["esp32"].send("start")
    }
}

module.exports = {StartMeasurements}