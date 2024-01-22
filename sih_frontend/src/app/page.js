'use client';

import styles from './page.module.css'
import {useEffect, useState} from "react";
import useWebSocket from "react-use-websocket";

export default function Home() {

    const [Train, SetTrain] = useState(null)
    const [Data, SetData] = useState(null)
    const [MeasurementStatus, SetMeasurementStatus] = useState(null)
    const [CurrentData, SetCurrentData] = useState({
        wagon_speed: 0.0,
        wagon_weight: 0.0,
        wagon_number: 0
    })
    const WS_URL = "ws://192.168.48.136:5000"

    const { sendJsonMessage } = useWebSocket(WS_URL, {
        onOpen: () => {
            sendJsonMessage({
                type: "isFrontEnd"
            })
            console.log("WebSocket connection established.");
        },
        onMessage: (res) => {
            let data = JSON.parse(res.data);
            switch (data.type){
                case "data":
                    SetData(data.data.data)
                    break;
                case "current_data":
                    SetCurrentData(data.data)
                    console.log("TEST")
                    GetData();
            }

        },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const GetData = ()=>{
        sendJsonMessage({
            type: "GetData"
        })
    }
    useEffect(() => {
        GetData();
    }, [GetData]);
    return (
    <main className={styles.main}>
        <div className={styles.trains}>
        {Train ?
            <>
                <div className={styles.left_col_header}>
                    <div>
                        <div className={styles.home} onClick={()=>{SetTrain(null)}}>HOME</div>
                        <div className={styles.train_name}>{Train.name}</div>
                        <div className={styles.train_number}>{Train.number}</div>
                    </div>
                </div>
                <div className={styles.left_col_body}>
                    {   Train.wagons &&
                        Train.wagons.map((wagon, index) => {
                            return (
                                <div key={index} className={styles.wagon_data}>
                                    <div className={styles.wagon_name}>Wagon {wagon.number}</div>
                                    <div className={styles.wagon_measurements}>
                                        <div className={styles.wagon_speed}>
                                            <div>Speed</div>
                                            <div>{wagon.speed.$numberDecimal}</div>
                                        </div>
                                        <div className={styles.wagon_weight}>
                                            <div>Weight</div>
                                            <div>{wagon.weight.$numberDecimal}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles.left_col_footer}>
                    {MeasurementStatus === null ?
                        <div className={styles.measurement_button + " " + styles.green} onClick={() => {
                            SetMeasurementStatus("begun")
                            sendJsonMessage({
                                type: "StartMeasurements"
                            })
                        }}>Start Measurement</div> :
                        MeasurementStatus === "begun" ?
                        <div className={styles.measurement_button + " " + styles.red} onClick={() => {
                            SetMeasurementStatus("end")
                        }}>End Measurement</div> :
                            <div style={{display: "flex"}}>
                                <div className={styles.measurement_button + " " + styles.grey} onClick={() => {
                                    //TODO: Send Data
                                }}>Send Data
                                </div>
                                <div className={styles.measurement_button + " " + styles.white} onClick={() => {
                                    SetMeasurementStatus(null)
                                }}>Reset
                                </div>
                            </div>
                    }
                </div>
            </> :
            <>
                <div className={styles.left_col_header}>
                    <div>
                        <div className={styles.heading}>TRAINS</div>
                    {Data &&
                        Data.map((item, index) => {
                            return <div onClick={() => {
                                sendJsonMessage({
                                    type: "setTrain",
                                    data: {
                                        item
                                    }
                                })
                                SetTrain(item)
                            }} key={index} className={styles.train_info}>{item.name}</div>
                        })
                    }
                    </div>
                </div>
            </>
        }
        </div>
        <div className={styles.train_details}>
        {
            Train &&
            <>
                <div className={styles.main_train_name}>{Train.name}</div>
                <div className={styles.train_measurements}>
                    <div className={styles.measurement}>
                        <div>
                        <div className={styles.field}>Wagon Number</div>
                        <div className={styles.value}>{CurrentData.wagon_number}</div>
                        </div>
                    </div>
                    <div className={styles.measurement}>
                        <div>
                        <div className={styles.field}>Wagon Speed</div>
                        <div className={styles.value}>{CurrentData.wagon_speed}</div>
                        </div>
                    </div>
                    <div className={styles.measurement}>
                        <div>
                        <div className={styles.field}>Wagon Weight</div>
                        <div className={styles.value}>{CurrentData.wagon_weight}</div>
                        </div>
                    </div>
                </div>
            </>
        }
        </div>
    </main>
    )
}
/*
{
type: "UpdateData",
data: {
    wagon_number: //Value,
    wagon_speed: //,
    wagon_weight: //
},
}
 */