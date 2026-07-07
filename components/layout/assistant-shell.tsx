"use client";

import { useState } from "react";
import { ChatPanel } from "@/components/chat/chat-panel";
import { Sidebar, SidebarToggle } from "@/components/sidebar/sidebar";
import { useChat } from "@/hooks/use-chat";

export function AssistantShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
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
  } = useChat();

  if (!activeConversation) {
    return null;
  }

  return (
    <main className="flex h-dvh overflow-hidden bg-background">
      <SidebarToggle onClick={() => setIsSidebarOpen(true)} />
      {isSidebarOpen && (
        <button
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-20 bg-background/70 backdrop-blur-sm md:hidden"
          type="button"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <Sidebar
        activeConversationId={activeConversationId}
        conversations={conversations}
        isOpen={isSidebarOpen}
        onCreateConversation={() => {
          createNewConversation();
          setIsSidebarOpen(false);
        }}
        onSelectConversation={(conversationId) => {
          setActiveConversationId(conversationId);
          setIsSidebarOpen(false);
        }}
        onToggle={() => setIsSidebarOpen((current) => !current)}
      />
      <ChatPanel
        conversation={activeConversation}
        error={error}
        isLoading={status === "loading"}
        onClear={clearActiveConversation}
        onRetry={retryLastMessage}
        onSubmit={submitMessage}
      />
    </main>
  );
}
