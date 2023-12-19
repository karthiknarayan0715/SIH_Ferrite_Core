const {Connections} = require("../models/Models");
const StopMeasurements = (ws, req) => {
    Connections["esp32"].send("stop")
}

module.exports = {StopMeasurements}