const {Connections} = require("../models/Models");
const StartMeasurements = (ws, req) => {
    Connections["esp32"].send("start")
}

module.exports = {StartMeasurements}