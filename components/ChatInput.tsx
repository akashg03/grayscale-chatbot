"use client";

import { useState } from "react";

interface ChatInputProps {
  readonly onSubmit: (raw: string) => void;
}

export function ChatInput({ onSubmit }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const errorId = "number-error";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const raw = value.trim();
    if (raw === "") {
      setError("Please enter a number.");
      return;
    }
    const isIntegerString = /^[-+]?\d+$/.test(raw);
    if (!isIntegerString) {
      setError("Please enter a valid number.");
      return;
    }
    onSubmit(raw);
    setValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 border-t border-slate-200 bg-white p-3"
      noValidate
    >
      <label htmlFor="number-input" className="sr-only">
        Enter a number
      </label>
      <div className="flex gap-2">
        <input
          id="number-input"
          type="text"
          inputMode="numeric"
          placeholder="Enter a number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
        />
        <button
          type="submit"
          className="rounded-lg bg-slate-700 px-4 py-2 font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
        >
          Send
        </button>
      </div>
      {error && (
        <p id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
