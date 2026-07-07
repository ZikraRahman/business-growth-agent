"use client";

import { useCallback, useMemo, useState } from "react";
import { sendAssistantMessage } from "@/services/assistant-api";
import type { ChatStatus, Conversation } from "@/types/chat";
import { createConversation, createMessage, titleFromMessage } from "@/utils/chat";

function getFriendlyError(error: unknown) {
  if (error instanceof Error) {
    if (error.message.includes("NEXT_PUBLIC_API_URL")) {
      return "The webhook URL is not configured. Add NEXT_PUBLIC_API_URL and restart the app.";
    }

    if (error.message.includes("180 seconds")) {
      return "The assistant did not respond within 180 seconds. Please try again.";
    }
  }

  return "I could not reach the assistant service. Make sure it is running, then try again.";
}

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>(() => [createConversation()]);
  const [activeConversationId, setActiveConversationId] = useState(() => conversations[0]?.id ?? "");
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === activeConversationId) ?? conversations[0],
    [activeConversationId, conversations],
  );

  const updateConversation = useCallback((conversationId: string, updater: (conversation: Conversation) => Conversation) => {
    setConversations((current) =>
      current.map((conversation) => (conversation.id === conversationId ? updater(conversation) : conversation)),
    );
  }, []);

  const submitMessage = useCallback(
    async (rawMessage: string) => {
      const chatInput = rawMessage.trim();

      if (!chatInput || status === "loading" || !activeConversation) {
        return;
      }

      const conversationId = activeConversation.id;
      const userMessage = createMessage("user", chatInput);

      setError(null);
      setLastFailedMessage(null);
      setStatus("loading");

      updateConversation(conversationId, (conversation) => ({
        ...conversation,
        title: conversation.messages.length === 0 ? titleFromMessage(chatInput) : conversation.title,
        messages: [...conversation.messages, userMessage],
        updatedAt: new Date().toISOString(),
      }));

      try {
        const response = await sendAssistantMessage(chatInput);
        const assistantMessage = createMessage("assistant", response.output);

        updateConversation(conversationId, (conversation) => ({
          ...conversation,
          messages: [...conversation.messages, assistantMessage],
          updatedAt: new Date().toISOString(),
        }));

        setStatus("idle");
      } catch (caughtError) {
        const message = getFriendlyError(caughtError);

        setError(message);
        setLastFailedMessage(chatInput);
        setStatus("error");

        updateConversation(conversationId, (conversation) => ({
          ...conversation,
          messages: [
            ...conversation.messages,
            {
              ...createMessage("assistant", message),
              failedUserMessage: chatInput,
            },
          ],
          updatedAt: new Date().toISOString(),
        }));
      }
    },
    [activeConversation, status, updateConversation],
  );

  const retryLastMessage = useCallback(() => {
    if (lastFailedMessage) {
      void submitMessage(lastFailedMessage);
    }
  }, [lastFailedMessage, submitMessage]);

  const createNewConversation = useCallback(() => {
    const conversation = createConversation();

    setConversations((current) => [conversation, ...current]);
    setActiveConversationId(conversation.id);
    setError(null);
    setLastFailedMessage(null);
    setStatus("idle");
  }, []);

  const clearActiveConversation = useCallback(() => {
    if (!activeConversation) {
      return;
    }

    updateConversation(activeConversation.id, (conversation) => ({
      ...conversation,
      title: "New conversation",
      messages: [],
      updatedAt: new Date().toISOString(),
    }));
    setError(null);
    setLastFailedMessage(null);
    setStatus("idle");
  }, [activeConversation, updateConversation]);

  return {
    activeConversation,
    activeConversationId,
    clearActiveConversation,
    conversations,
    createNewConversation,
    error,
    retryLastMessage,
    setActiveConversationId,
    status,
    submitMessage,
  };
}
