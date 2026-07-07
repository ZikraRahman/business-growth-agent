"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  BrainCircuit,
  Brush,
  ChevronRight,
  Megaphone,
  RotateCcw,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { AgentActivity } from "@/components/chat/agent-activity";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessage } from "@/components/chat/chat-message";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import type { Conversation } from "@/types/chat";

interface ChatPanelProps {
  conversation: Conversation;
  error: string | null;
  isLoading: boolean;
  onClear: () => void;
  onRetry: () => void;
  onSubmit: (message: string) => void;
}

const starterPrompts = [
  "Design a premium launch strategy for a B2B SaaS product.",
  "Research competitors and summarize the strongest market opportunity.",
  "Create positioning, campaign angles, and ad concepts for a new offer.",
];

const specialistAgents = [
  {
    name: "Marketing Agent",
    description: "Growth strategy, campaign planning, and channel recommendations.",
    icon: Megaphone,
  },
  {
    name: "Research Agent",
    description: "Market intelligence, competitor analysis, and structured summaries.",
    icon: Search,
  },
  {
    name: "Creative Agent",
    description: "Campaign concepts, messaging angles, and polished content ideas.",
    icon: Brush,
  },
  {
    name: "Strategy Agent",
    description: "Business framing, prioritization, and executive-ready guidance.",
    icon: BarChart3,
  },
];

const capabilityChips = ["Market research", "Brand positioning", "Campaign ideas", "Business analysis"];

export function ChatPanel({
  conversation,
  error,
  isLoading,
  onClear,
  onRetry,
  onSubmit,
}: ChatPanelProps) {
  const endRef = useRef<HTMLDivElement>(null);
  const hasMessages = conversation.messages.length > 0;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [conversation.messages, isLoading]);

  return (
    <section className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--background))_0%,hsl(var(--accent)/0.35)_45%,hsl(var(--secondary)/0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,hsl(var(--primary)/0.12),transparent_32%),radial-gradient(circle_at_90%_20%,hsl(var(--secondary)/0.7),transparent_28%)]" />
      <header className="relative z-10 flex items-center justify-between gap-3 border-b bg-background/70 px-4 py-3 backdrop-blur-xl md:px-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            AI Multi-Agent Business Platform
          </p>
          <h1 className="line-clamp-1 text-lg font-semibold md:text-xl">{conversation.title}</h1>
        </div>
        <Button
          type="button"
          variant="ghost"
          onClick={onClear}
          disabled={!hasMessages || isLoading}
          title="Clear chat"
          className="shrink-0"
        >
          <Trash2 className="h-4 w-4" />
          <span className="hidden sm:inline">Clear</span>
        </Button>
      </header>

      <div className="relative z-10 min-h-0 flex-1 overflow-y-auto px-4 py-6 md:px-6">
        {!hasMessages ? (
          <div className="mx-auto flex min-h-full max-w-6xl flex-col justify-center py-8 md:py-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="relative overflow-hidden rounded-2xl border bg-card/80 p-6 shadow-soft backdrop-blur-xl md:p-10"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-amber-400 to-rose-400" />
              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    Specialist agents working for you
                  </div>
                  <h2 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-6xl">
                    Your AI Business Team, All in One Place
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                    Powered by a team of intelligent specialist AI agents working together to deliver marketing strategies, competitive research, creative campaigns, business insights, and clear recommendations.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {capabilityChips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border bg-background/70 px-3 py-1 text-sm text-muted-foreground shadow-sm"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border bg-background/65 p-4 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">Agent collaboration</p>
                      <p className="text-xs text-muted-foreground">Specialists coordinate each response.</p>
                    </div>
                    <BrainCircuit className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-3">
                    {specialistAgents.map((agent, index) => {
                      const Icon = agent.icon;

                      return (
                        <motion.div
                          key={agent.name}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.12 + index * 0.08 }}
                          className="flex items-center gap-3 rounded-lg border bg-card/80 p-3"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium">{agent.name}</p>
                            <p className="line-clamp-1 text-xs text-muted-foreground">{agent.description}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {specialistAgents.map((agent, index) => {
                const Icon = agent.icon;

                return (
                  <motion.div
                    key={agent.name}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 + index * 0.06 }}
                    className="group rounded-xl border bg-card/80 p-5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-soft"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-amber-300/20 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">{agent.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{agent.description}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => onSubmit(prompt)}
                  disabled={isLoading}
                  className="group flex min-h-24 items-start justify-between gap-3 rounded-xl border bg-card/80 p-4 text-left text-sm leading-6 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span>{prompt}</span>
                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto flex max-w-4xl flex-col gap-5">
            <AnimatePresence initial={false}>
              {conversation.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </AnimatePresence>
            <AgentActivity isLoading={isLoading} />
            {isLoading && <TypingIndicator />}
            <div ref={endRef} />
          </div>
        )}
      </div>

      {error && (
        <div className="border-t bg-destructive/5 px-4 py-3 md:px-6">
          <div className="mx-auto flex max-w-4xl flex-col gap-3 text-sm text-destructive sm:flex-row sm:items-center sm:justify-between">
            <span>{error}</span>
            <Button type="button" variant="outline" size="sm" onClick={onRetry} disabled={isLoading}>
              <RotateCcw className="h-4 w-4" />
              Retry
            </Button>
          </div>
        </div>
      )}

      <div className="relative z-10 border-t bg-background/75 px-4 py-4 backdrop-blur-xl md:px-6">
        <div className="mx-auto max-w-4xl">
          <ChatInput disabled={isLoading} onSubmit={onSubmit} />
        </div>
      </div>
    </section>
  );
}
