// Medical AI Integration with OpenAI API
// This utility handles flexible medical questions and guidance using OpenAI

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export const getMedicalGuidance = async (userInput: string): Promise<string> => {
  if (!OPENAI_API_KEY) {
    return "API key not configured. Please set VITE_OPENAI_API_KEY in your .env file.";
  }

  const systemPrompt = `You are a helpful medical guidance AI assistant. Your role is to:
1. Listen to health concerns and symptoms from users
2. Provide general medical guidance and first aid advice
3. Always recommend professional medical consultation for serious conditions
4. Be empathetic and clear in your responses
5. For emergency situations, recommend immediate professional help

Important guidelines:
- Keep responses concise (2-3 sentences maximum for voice readability)
- Never diagnose - only provide guidance based on symptoms
- Always err on the side of caution for serious conditions
- For life-threatening emergencies, direct to emergency services immediately
- Use simple, clear language suitable for voice output`;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userInput,
          },
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API Error:", error);
      return "Unable to process your request. Please try again.";
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return "Error processing request. Please try again.";
  }
};

export const detectEmergency = (userInput: string): boolean => {
  const emergencyKeywords = [
    "help",
    "sos",
    "emergency",
    "hospital",
    "ambulance",
    "911",
    "112",
    "999",
    "accident",
    "fall",
    "urgent",
    "danger",
    "severe",
    "critical",
    "unconscious",
    "bleeding",
    "choking",
    "stroke",
    "heart attack",
    "can't breathe",
    "severe pain",
    "dying",
    "dial",
    "urgent",
  ];

  const lowerInput = userInput.toLowerCase();
  return emergencyKeywords.some((keyword) => lowerInput.includes(keyword));
};

export const getEmergencySOS = (): string => {
  return `SOS Alert triggered! Emergency services have been notified. 
  Emergency numbers: 112 (Europe/UK), 911 (US), 999 (UK). 
  Stay calm and state your location and condition. Help is on the way!`;
};
