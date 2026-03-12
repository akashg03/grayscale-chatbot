"use client";

import { useState, useRef, useEffect } from "react";
import { getGrayscaleForNumber } from "@/lib/colorLogic";
import type { ChatMessage } from "@/types/chat";
import { Message } from "./Message";
import { ChatInput } from "./ChatInput";

function generateId(): string {
  return Math.random().toString(36).slice(2);
}

export function ChatContainer() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo(0, listRef.current.scrollHeight);
  }, [messages]);

  function handleSubmit(raw: string) {
    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      text: raw,
    };
    const { color } = getGrayscaleForNumber(raw);
    const botMessage: ChatMessage = {
      id: generateId(),
      role: "bot",
      text: `Received number ${raw}`,
      color,
    };
    setMessages((prev) => [...prev, userMessage, botMessage]);
  }

  return (
    <section
      className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm"
      aria-label="Chat"
    >
      <div
        ref={listRef}
        className="flex max-h-[60vh] min-h-[200px] flex-col gap-3 overflow-y-auto p-4"
        aria-live="polite"
        aria-label="Messages"
      >
        <ul className="flex flex-col gap-3">
          {messages.map((msg) => (
            <Message key={msg.id} message={msg} />
          ))}
        </ul>
      </div>
      <ChatInput onSubmit={handleSubmit} />
    </section>
  );
}
