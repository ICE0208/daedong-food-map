"use client";

import { SearchKeywordResponse } from "@/types/apiTypes";
import { FormEvent, useState, useEffect, useRef } from "react";
import { generateMessage } from "../actions";

const INIT_MESSAGES: Message[] = [
  { type: "AI", content: "어떤 음식이 드시고 싶나요?" },
];

interface Message {
  type: "AI" | "USER" | "AI_ERROR";
  content: string;
}

interface AIChatProps {
  restaurantsData?: SearchKeywordResponse["documents"];
}

export default function AIChat({ restaurantsData }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>(INIT_MESSAGES);
  const [value, setValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimValue = value.trim();
    if (trimValue.length === 0) return setValue("");
    setError(null);
    setIsLoading(true);

    const userMessage: Message = { type: "USER", content: trimValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setValue("");

    const response = await generateMessage(trimValue, restaurantsData);

    setIsLoading(false);
    if (response.status) {
      const aiMessage: Message = { type: "AI", content: response.message };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="absolute left-4 top-4 z-10 flex h-[600px] w-[360px] flex-col items-center rounded-xl bg-neutral-100/90 py-4 shadow-xl">
      <span className="text-3xl font-semibold">AI Chat</span>
      <div className="my-2 flex w-full flex-1 flex-col gap-2 overflow-y-auto px-6 py-2">
        <>
          {messages.map((message, index) => (
            <Message
              key={index}
              type={message.type}
              content={message.content}
            />
          ))}
          {isLoading && <Message type="AI" content="로딩중..." />}
          {error && <Message type="AI_ERROR" content={error} />}
        </>
        <div ref={messagesEndRef} />
      </div>
      <form
        className="flex w-full items-center justify-center px-4"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full rounded-lg border-2 px-2 py-1 font-medium outline-none"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          required
          minLength={1}
          maxLength={50}
          placeholder="내 취향 입력하기"
        />
        <button className="text-nowrap px-2 text-lg font-medium">전송</button>
      </form>
    </div>
  );
}

const Message = ({
  type,
  content,
}: {
  type: Message["type"];
  content: string;
}) => {
  const messageStyles = {
    AI: "bg-white self-start",
    USER: "bg-amber-300/70 self-end",
    AI_ERROR: "bg-white self-start text-red-500",
  };

  return (
    <div
      className={`max-w-[80%] rounded-lg px-3 py-2 ${messageStyles[type]} text-pretty break-words border-[1px] border-black/5 font-medium shadow-sm`}
    >
      {content}
    </div>
  );
};
