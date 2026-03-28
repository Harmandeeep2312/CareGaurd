const API_URL = "http://localhost:5000";

export const simulateSensor = async (
  elderId: string,
  type: "fall" | "walking" | "running" | "idle"
) => {

  const res = await fetch(`${API_URL}/api/simulate/sensor-data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      elderId,
      simulationType: type
    })
  });

  if (!res.ok) throw new Error("ML API failed");

  return await res.json();
};