import type { AssistantResponse } from "@/types/chat";

const REQUEST_TIMEOUT_MS = 180000;

export async function sendAssistantMessage(chatInput: string): Promise<AssistantResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatInput }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`The assistant service returned ${response.status}.`);
    }

    const data = (await response.json()) as Partial<AssistantResponse>;

    if (typeof data.output !== "string") {
      throw new Error("The assistant response did not include an output field.");
    }

    return { output: data.output };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("The assistant took longer than 180 seconds to respond.");
    }

    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}
