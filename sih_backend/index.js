const WebSocketServer = require("ws").WebSocketServer
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const Connections = require("./models/Models").Connections;
const {Add} = require("./helpers/DataProcessor")
const {v4: uuidv4} = require("uuid")
const GetData = require("./api/GetData").GetData
const UpdateData = require("./api/UpdateData").UpdateData
const IsFrontEnd = require("./api/IsFrontEnd").IsFrontEnd
const IsESP32 = require("./api/IsESP32").IsESP32
const SetTrain = require("./api/SetTrain").SetTrain
const StartMeasurements = require("./api/StartMeasurements").StartMeasurements
const StopMeasurements = require("./api/StopMeasurements").StopMeasurements
const GetArchive = require("./api/GetArchive").GetArchive
const uri = "mongodb://localhost:27017/SIH_Dev"

mongoose.connect(uri).then(()=>{
    console.log("Connected to MongoDB!")
});


//HELPS US USE THE .env FILE IN OUR CODE
dotenv.config()

//HANDLES EVERY REQUEST 
const HandleMessage = (ws, req)=>{
    const func = req.type.charAt(0).toUpperCase() + req.type.slice(1)
    eval(func)(ws, req)
}


const wss = new WebSocketServer({
    host: process.env.HOST,
    port: process.env.PORT
})
console.log("THE SERVER IS UP AND RUNNING ON PORT "+process.env.PORT)


wss.on('connection', (ws)=>{
    console.log("CONNECTED")
    let uuid = uuidv4();
    ws.id = uuid
    Connections[uuid] = ws

    //TELLING THE CLIENT THE CONNECTION IS SUCCESSFUL
    ws.send(JSON.stringify({
        type: "feedback",
        data: {
            result: "success",
            user_id: uuid
        }
    }))

    //HANDLING MESSAGES
    ws.on("message", async (message)=>{
        const req = await JSON.parse(message)
        HandleMessage(ws, req)
    })

    //HANDLING CLIENT DISCONNECTION
    ws.on('close', ()=>{
        console.log(`${ws.id} DISCONNECTED`)
    })
})