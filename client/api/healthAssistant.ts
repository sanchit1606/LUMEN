export interface SymptomsPayload {
  age: number;
  gender: string;
  symptoms: string;
  duration?: string;
  language?: string;
}

export interface TriageResponse {
  severity: "GREEN" | "YELLOW" | "RED";
  probable_conditions: string[];
  guidance: string;
  red_flags: string[];
  disclaimer: string;
}

export async function sendSymptoms(payload: SymptomsPayload): Promise<TriageResponse> {
  const response = await fetch(
    "https://sanchit1606.app.n8n.cloud/webhook/2837e22a-d927-40c4-bc43-7c2ec38cfdcf",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    throw new Error(`Health assistant error: ${response.status}`);
  }

  return response.json();
}

