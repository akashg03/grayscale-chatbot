"use client";

import type { ChatMessage as ChatMessageType } from "@/types/chat";

function getContrastClass(hex: string): "text-gray-900" | "text-white" {
  const match = hex.slice(1).match(/.{2}/g);
  if (!match) return "text-gray-900";
  const r = Number.parseInt(match[0], 16);
  const g = Number.parseInt(match[1], 16);
  const b = Number.parseInt(match[2], 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "text-gray-900" : "text-white";
}

interface MessageProps {
  readonly message: ChatMessageType;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === "user";

  return (
    <li
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      aria-label={isUser ? "Your message" : "Bot reply"}
    >
      <span
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm transition-colors duration-300 break-words whitespace-pre-wrap ${
          isUser
            ? "bg-slate-700 text-white"
            : `${getContrastClass(message.color ?? "#ffffff")}`
        }`}
        style={!isUser && message.color ? { backgroundColor: message.color } : undefined}
      >
        {message.text}
      </span>
    </li>
  );
}
