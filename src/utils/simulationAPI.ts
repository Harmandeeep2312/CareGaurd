// API Integration for AI Model Simulations
// This utility connects the frontend to Python backend models

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export interface SimulationResult {
  model_name: string;
  accuracy: number;
  predictions: any[];
  metrics: Record<string, number>;
  status: string;
}

export const runActivityPrediction = async (sensorData?: any): Promise<SimulationResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/simulate/activity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sensor_data: sensorData || {},
      }),
    });

    if (!response.ok) {
      throw new Error("Activity prediction failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Activity prediction error:", error);
    throw error;
  }
};

export const runFallDetection = async (accelerometerData?: any): Promise<SimulationResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/simulate/fall-detection`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accelerometer_data: accelerometerData || {},
      }),
    });

    if (!response.ok) {
      throw new Error("Fall detection failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Fall detection error:", error);
    throw error;
  }
};

export const runHealthRiskPrediction = async (vitalSigns?: any): Promise<SimulationResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/simulate/health-risk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vital_signs: vitalSigns || {},
      }),
    });

    if (!response.ok) {
      throw new Error("Health risk prediction failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Health risk prediction error:", error);
    throw error;
  }
};

export const runRoutineMonitoring = async (activityLog?: any): Promise<SimulationResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/simulate/routine-monitor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activity_log: activityLog || {},
      }),
    });

    if (!response.ok) {
      throw new Error("Routine monitoring failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Routine monitoring error:", error);
    throw error;
  }
};

export const getAllSimulations = async (): Promise<SimulationResult[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/simulations`);

    if (!response.ok) {
      throw new Error("Failed to fetch simulations");
    }

    return await response.json();
  } catch (error) {
    console.error("Get simulations error:", error);
    throw error;
  }
};
