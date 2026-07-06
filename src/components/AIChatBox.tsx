"use client";

import { cn } from "@/lib/utils";
import { HiPaperAirplane, HiUser, HiStar, HiArrowPath } from "react-icons/hi2";
import { useState, useEffect, useRef } from "react";

export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type AIChatBoxProps = {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
  height?: string | number;
  emptyStateMessage?: string;
  suggestedPrompts?: string[];
};

export function AIChatBox({
  messages,
  onSendMessage,
  isLoading = false,
  placeholder = "Escribe tu mensaje...",
  className,
  height = "500px",
  emptyStateMessage = "Inicia una conversación con IA",
  suggestedPrompts,
}: AIChatBoxProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const displayMessages = messages.filter((msg) => msg.role !== "system");

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayMessages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSendMessage(trimmed);
    setInput("");
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-gray-800 bg-[#0a0a0a] overflow-hidden",
        className
      )}
      style={{ height }}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {displayMessages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-gray-500">
            <HiStar className="size-10 opacity-20" />
            <p className="text-sm">{emptyStateMessage}</p>
            {suggestedPrompts && suggestedPrompts.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => onSendMessage(prompt)}
                    disabled={isLoading}
                    className="rounded-lg border border-gray-800 bg-[#111] px-3 py-1.5 text-xs text-gray-400 transition-colors hover:bg-[#1a1a1a] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {displayMessages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="size-7 shrink-0 mt-0.5 rounded-full bg-red-600/10 flex items-center justify-center">
                    <HiStar className="size-3.5 text-red-500" />
                  </div>
                )}

                <div
                  className={cn(
                    "max-w-[80%] rounded-xl px-4 py-2.5 text-sm",
                    message.role === "user"
                      ? "bg-red-600 text-white"
                      : "bg-[#111] text-gray-200 border border-gray-800"
                  )}
                >
                  <p className="whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                </div>

                {message.role === "user" && (
                  <div className="size-7 shrink-0 mt-0.5 rounded-full bg-gray-800 flex items-center justify-center">
                    <HiUser className="size-3.5 text-gray-400" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="size-7 shrink-0 mt-0.5 rounded-full bg-red-600/10 flex items-center justify-center">
                  <HiStar className="size-3.5 text-red-500" />
                </div>
                <div className="rounded-xl bg-[#111] border border-gray-800 px-4 py-2.5">
                  <HiArrowPath className="size-4 animate-spin text-gray-500" />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 p-3 border-t border-gray-800 bg-[#0a0a0a]"
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className="flex-1 resize-none rounded-lg bg-[#111] border border-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-red-600 max-h-24"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="shrink-0 size-9 rounded-lg bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <HiArrowPath className="size-4 animate-spin" />
          ) : (
            <HiPaperAirplane className="size-4" />
          )}
        </button>
      </form>
    </div>
  );
}
