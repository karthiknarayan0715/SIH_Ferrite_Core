const {Connections} = require("../models/Models");
const IsESP32 = (ws)=> {
    delete Connections[ws.id]
    ws.id = 'esp32'
    Connections['esp32'] = ws;
    console.log(Object.keys(Connections))
}

module.exports = {IsESP32}