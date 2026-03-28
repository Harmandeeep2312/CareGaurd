import { useState } from "react";

export default function SimulationDashboard() {

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const API = "http://localhost:5000";
  const elderId = "demo-user";

  const simulate = async (type:string) => {

    setLoading(true);

    try {

      const res = await fetch(`${API}/api/simulate/sensor-data`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          elderId,
          simulationType:type
        })
      });

      const data = await res.json();

      setResult(data);

    } catch(err){

      console.error(err);
      alert("Simulation failed");

    }

    setLoading(false);

  }

  return (

    <div className="p-10 bg-slate-900 min-h-screen text-white">

      <h1 className="text-3xl font-bold mb-8">
        ML Simulation Dashboard
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

        <button
          onClick={()=>simulate("idle")}
          className="bg-green-600 px-6 py-3 rounded-lg"
        >
          Simulate Idle
        </button>

      </div>

      {loading && <p>Running ML model...</p>}

      {result && (

        <div className="bg-slate-800 p-6 rounded-lg">

          <h2 className="text-xl mb-4">
            Prediction Result
          </h2>

          <p>
            Activity:
            <b> {result.predictions.activity.result}</b>
          </p>

          <p>
            Fall Detection:
            <b>
              {result.predictions.fall.isFall
                ? " FALL DETECTED"
                : " SAFE"}
            </b>
          </p>

          <p>
            Acceleration Z:
            {result.sensorData.accZ.toFixed(2)}
          </p>

        </div>

      )}

    </div>

  );
}