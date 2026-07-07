"use client";

import { BrainCircuit, MessageSquareText, PanelLeftClose, PanelLeftOpen, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/types/chat";

interface SidebarProps {
  activeConversationId: string;
  conversations: Conversation[];
  isOpen: boolean;
  onCreateConversation: () => void;
  onSelectConversation: (conversationId: string) => void;
  onToggle: () => void;
}

export function Sidebar({
  activeConversationId,
  conversations,
  isOpen,
  onCreateConversation,
  onSelectConversation,
  onToggle,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex w-80 flex-col border-r bg-card/95 shadow-soft backdrop-blur-xl transition-transform duration-300 md:static md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex items-center justify-between border-b px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-teal-300 text-primary-foreground shadow-sm">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Business AI Assistant</p>
            <p className="text-xs text-muted-foreground">Multi-agent business platform</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button
            aria-label="Close sidebar"
            className="md:hidden"
            size="icon"
            type="button"
            variant="ghost"
            onClick={onToggle}
            title="Close sidebar"
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <Button type="button" className="w-full rounded-xl shadow-sm transition hover:scale-[1.01]" onClick={onCreateConversation}>
          <Plus className="h-4 w-4" />
          New chat
        </Button>
        <div className="rounded-xl border bg-background/70 p-3">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Agent team
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Research", "Strategy", "Marketing", "Creative"].map((agent) => (
              <span key={agent} className="rounded-full bg-primary/10 px-2 py-1 text-[11px] text-primary">
                {agent}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 pb-4">
        <div className="mb-2 px-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Conversations
        </div>
        <div className="space-y-1.5">
          {conversations.map((conversation) => {
            const isActive = conversation.id === activeConversationId;

            return (
              <button
                key={conversation.id}
                type="button"
                onClick={() => onSelectConversation(conversation.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent/80 hover:text-accent-foreground",
                )}
              >
                <MessageSquareText className="h-4 w-4 shrink-0" />
                <span className="truncate">{conversation.title}</span>
              </button>
            );
          })}
        </div>
      </ScrollArea>

      <div className="border-t p-4 text-xs leading-5 text-muted-foreground">
        Chat history is kept in this browser session for fast product demos.
      </div>
    </aside>
  );
}

export function SidebarToggle({ onClick }: { onClick: () => void }) {
  return (
    <Button
      aria-label="Open sidebar"
      className="fixed left-3 top-3 z-20 md:hidden"
      size="icon"
      type="button"
      variant="outline"
      onClick={onClick}
      title="Open sidebar"
    >
      <PanelLeftOpen className="h-4 w-4" />
    </Button>
  );
}
