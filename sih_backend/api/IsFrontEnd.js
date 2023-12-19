const {Connections} = require("../models/Models");
const IsFrontEnd = (ws)=>{
    delete Connections[ws.id]
    ws.id = 'frontend'
    Connections['frontend'] = ws;
    // console.log(Connections)
}

module.exports = {IsFrontEnd}