import type { ChatMessage, Conversation } from "@/types/chat";

export function createId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return {
    id: createId("message"),
    role,
    content,
    createdAt: new Date().toISOString(),
  };
}

export function createConversation(): Conversation {
  const now = new Date().toISOString();

  return {
    id: createId("conversation"),
    title: "New conversation",
    messages: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function titleFromMessage(message: string) {
  const trimmed = message.trim().replace(/\s+/g, " ");
  return trimmed.length > 42 ? `${trimmed.slice(0, 42)}...` : trimmed || "New conversation";
}
