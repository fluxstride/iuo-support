/* eslint-disable @typescript-eslint/no-explicit-any */
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, SendIcon, Sparkle, User } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router";
import iuoLogo from "@/assets/iuo-logo.png";
import Markdown from "react-markdown";

const API_URL = import.meta.env.VITE_API_URL;

function AISupportChat() {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    maxSteps: 3,
    api: `${API_URL}/chat`,
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto border-2 border-blue-100 h-screen ">
      <PageHeader />
      <ChatMessages {...{ chatContainerRef, messages }} />
      <ChatForm {...{ status, input, handleInputChange, handleSubmit }} />
    </div>
  );
}

export default AISupportChat;

const PageHeader = () => {
  return (
    <div className="flex items-center  ap-4 py-1 border-b-2 border-b-blue-100 shadow-sm">
      <div className="flex items-center gap-3 w-fit mx-0 md:mx-auto px-3 py-1">
        <div className="w-12 h-12 p-1 rounded-full bg-[#261a6d]">
          <img src={iuoLogo} />
        </div>
        <h1 className="font-medium text-xl text-center">Support</h1>
        <div className="w-2.5 h-2.5 bg-green-400 rounded-full" />
      </div>
    </div>
  );
};

const ChatForm = ({ status, input, handleInputChange, handleSubmit }: any) => {
  return (
    <form onSubmit={handleSubmit} className="">
      <div className="px-4 fixed bottom-6 left-[50%] translate-x-[-50%] w-full max-w-4xl ">
        <p>
          Need to talk to a human?{" "}
          <Link to="/talk-to-us" className="text-blue-500 underline">
            Contact us here
          </Link>
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Input
            type="text"
            value={input}
            placeholder="Ask your question here..."
            onChange={handleInputChange}
            className="shadow-md p-5"
          />
          <Button type="submit" size="lg" disabled={status === "streaming"}>
            <SendIcon />
          </Button>
        </div>
      </div>
    </form>
  );
};

const ChatMessages = ({ chatContainerRef, messages }: any) => {
  return (
    <div
      className="mt-6 mb-28 space-y-6 overflow-y-auto scroll-smooth px-4"
      ref={chatContainerRef}
    >
      <div className="bg-blue-50 w-fit p-3 rounded-2xl rounded-tl-none">
        <div className="flex items-center gap-2">
          <Sparkle className="text-blue-500 w-4" />
          <span>Support</span>
        </div>

        <p className="mt-2">
          Hi, I am IUO Support,{" "}
          <b>
            A campus wide AI-Driven Information Retrieval and support system for
            Igbinedion University Okada
          </b>
          , how can i help you today?
        </p>
      </div>
      {messages.map((m: any, i: any) =>
        m.role === "user" ? (
          <div
            key={m.id}
            className="bg-gray-50 w-fit py-3 px-4 rounded-2xl rounded-tr-none ml-auto"
          >
            <div className="flex items-center gap-1">
              <User className="text-blue-500 w-4" />
              <p className="font-medium">You</p>
            </div>
            <p className="mt-2">{m.content}</p>
          </div>
        ) : (
          <div
            key={m.id}
            className="bg-blue-50 w-fit p-3 rounded-2xl rounded-tl-none"
          >
            <div className="flex items-center gap-2">
              <Sparkle className="text-blue-500 w-4" />
              <div className="font-medium flex gap-1">
                <span>Support</span>
                {status === "streaming" && i === messages.length - 1 ? (
                  <Loader2 className="w-3 animate-spin" />
                ) : null}
              </div>
            </div>
            <div className="mt-2">
              <Markdown>{m.content}</Markdown>
            </div>
          </div>
        ),
      )}
    </div>
  );
};
