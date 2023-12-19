let {UpdateCurrentTrain} = require("../models/Models");
const SetTrain = async (ws, req) => {
    UpdateCurrentTrain(req.data);
}

module.exports = {SetTrain}