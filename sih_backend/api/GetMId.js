const {Connections, Wagon, CurrentMId} = require("../models/Models");
const GetMId = async ()=>{

    Connections["frontend"].send(JSON.stringify({
        type: "currentMId",
        data:{
            measurement_id: CurrentMId
        }
    }))
}

module.exports = {GetMId}