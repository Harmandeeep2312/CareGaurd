import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function MLSimulationDashboard() {

  const [sensorData, setSensorData] = useState<any[]>([]);
  const [prediction, setPrediction] = useState<any>(null);

  const API = "http://localhost:5000";

  const simulate = async (type:string) => {

    const res = await fetch(`${API}/api/simulate/sensor-data`,{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify({
        elderId:"demo-user",
        simulationType:type
      })
    });

    const data = await res.json();

    setPrediction(data);

    setSensorData(prev=>[
      ...prev,
      {
        accX:data.sensorData.accX,
        accY:data.sensorData.accY,
        accZ:data.sensorData.accZ
      }
    ]);
  }

  return (

    <div className="p-8 bg-slate-900 min-h-screen text-white">

      <h1 className="text-3xl font-bold mb-6">
        ML Monitoring Dashboard
      </h1>

      {/* Simulation Buttons */}

      <div className="flex gap-4 mb-8">

        <button
          onClick={()=>simulate("fall")}
          className="bg-red-600 px-6 py-3 rounded-lg"
        >
          Simulate Fall
        </button>

        <button
          onClick={()=>simulate("walking")}
          className="bg-blue-600 px-6 py-3 rounded-lg"
        >
          Simulate Walking
        </button>

        <button
          onClick={()=>simulate("running")}
          className="bg-yellow-600 px-6 py-3 rounded-lg"
        >
          Simulate Running
        </button>

      </div>

      {/* Sensor Graph */}

      <div className="bg-slate-800 p-6 rounded-lg mb-6">

        <h2 className="text-xl mb-4">Acceleration Graph</h2>

        <LineChart width={600} height={300} data={sensorData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis />
          <YAxis />
          <Tooltip />

          <Line type="monotone" dataKey="accX" stroke="#8884d8"/>
          <Line type="monotone" dataKey="accY" stroke="#82ca9d"/>
          <Line type="monotone" dataKey="accZ" stroke="#ff7300"/>

        </LineChart>

      </div>

      {/* Predictions */}

      {prediction && (

        <div className="bg-slate-800 p-6 rounded-lg">

          <h2 className="text-xl mb-4">
            ML Prediction
          </h2>

          <p>
            Activity:
            <b> {prediction.predictions.activity.result}</b>
          </p>

          <p>
            Fall Detection:
            <b>
              {prediction.predictions.fall.isFall
                ? " FALL DETECTED"
                : " SAFE"}
            </b>
          </p>

          <p>
            Acceleration Z:
            {prediction.sensorData.accZ.toFixed(2)}
          </p>

        </div>

      )}

    </div>
  );
}
