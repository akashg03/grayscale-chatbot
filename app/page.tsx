import { ChatContainer } from "@/components/ChatContainer";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <main className="w-full max-w-lg">
        <h1 className="mb-4 text-center text-xl font-semibold text-slate-900">
          Grayscale Chatbot
        </h1>
        <p className="mb-4 text-center text-sm text-slate-600">
          Enter a number. The bot reply background reflects the last two digits as a grayscale color.
        </p>
        <ChatContainer />
      </main>
    </div>
  );
}
