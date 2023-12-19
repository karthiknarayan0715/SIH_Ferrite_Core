const {Wagon} = require("../models/Models");
const GetArchive = async (ws, req)=>{
    const train_id = req.data.train_id;
    const archive = await Wagon.find({train: train_id})
    ws.send(JSON.stringify({
        type: "archive",
        data: {
            archive
        }
    }))
}
module.exports = {GetArchive}