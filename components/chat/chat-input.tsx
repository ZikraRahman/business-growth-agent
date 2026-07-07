"use client";

import { Mic, Paperclip, SendHorizontal } from "lucide-react";
import { FormEvent, KeyboardEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  disabled?: boolean;
  onSubmit: (message: string) => void;
}

export function ChatInput({ disabled, onSubmit }: ChatInputProps) {
  const [message, setMessage] = useState("");

  function submit(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const value = message.trim();

    if (!value || disabled) {
      return;
    }

    onSubmit(value);
    setMessage("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border bg-card/90 p-2 shadow-soft backdrop-blur transition focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10"
    >
      <div className="flex items-end gap-2">
        <Button
          aria-label="Attach file"
          className="mb-1 h-10 w-10 shrink-0 text-muted-foreground"
          disabled
          size="icon"
          type="button"
          variant="ghost"
          title="Attachments are not enabled yet"
        >
          <Paperclip className="h-4 w-4" />
        </Button>
        <Textarea
          aria-label="Message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Ask your specialist agents for strategy, research, positioning, campaigns..."
          className="max-h-52 min-h-[70px] resize-none border-0 bg-transparent px-1 py-3 text-base shadow-none focus-visible:ring-0"
        />
        <Button
          aria-label="Voice input"
          className="mb-1 hidden h-10 w-10 shrink-0 text-muted-foreground sm:inline-flex"
          disabled
          size="icon"
          type="button"
          variant="ghost"
          title="Voice input is not enabled yet"
        >
          <Mic className="h-4 w-4" />
        </Button>
        <Button
          aria-label="Send message"
          className="mb-1 h-11 w-11 shrink-0 rounded-xl shadow-sm transition hover:scale-105 active:scale-95"
          disabled={!message.trim() || disabled}
          size="icon"
          type="submit"
          title="Send message"
        >
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
