"use client";

import { motion } from "framer-motion";
import { Bot, Sparkles, UserRound } from "lucide-react";
import { CopyButton } from "@/components/common/copy-button";
import { MarkdownContent } from "@/components/chat/markdown-content";
import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const timestamp = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(message.createdAt));

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24 }}
      className={cn("flex gap-3", isUser && "justify-end")}
    >
      {!isUser && (
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-teal-300 text-primary-foreground shadow-sm">
          <Bot className="h-4 w-4" />
        </div>
      )}
      <div
        className={cn(
          "group max-w-[min(760px,88%)] rounded-2xl border px-4 py-3 shadow-sm backdrop-blur",
          isUser
            ? "bg-primary text-primary-foreground shadow-primary/10"
            : "bg-card/90 text-card-foreground",
          message.failedUserMessage && "border-destructive/40",
        )}
      >
        <div className="mb-2 flex items-center gap-2 text-xs opacity-75">
          {!isUser && <Sparkles className="h-3.5 w-3.5" />}
          <span>{isUser ? "You" : "AI agent team"}</span>
          <span aria-hidden="true">/</span>
          <time dateTime={message.createdAt}>{timestamp}</time>
        </div>
        <div className="flex items-start justify-between gap-3">
          <MarkdownContent content={message.content} className={isUser ? "prose-invert" : undefined} />
          {!isUser && <CopyButton value={message.content} />}
        </div>
      </div>
      {isUser && (
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground shadow-sm">
          <UserRound className="h-4 w-4" />
        </div>
      )}
    </motion.article>
  );
}
