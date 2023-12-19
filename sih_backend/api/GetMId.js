const {Connections, Wagon} = require("../models/Models");
const GetMId = async ()=>{
    const wagon = await Wagon.findLast()
    Connections["frontend"].send(JSON.stringify({
        type: "currentMId",
        data:{
            measurement_id: wagon.measurement_id + 1
        }
    }))
}