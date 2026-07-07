export type MessageRole = "user" | "assistant";

export type ChatStatus = "idle" | "loading" | "error";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
  failedUserMessage?: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface AssistantResponse {
  output: string;
}
