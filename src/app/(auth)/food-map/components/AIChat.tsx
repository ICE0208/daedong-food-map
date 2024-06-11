"use client";

import { SearchKeywordResponse } from "@/types/apiTypes";
import { FormEvent, useState, useEffect, useRef } from "react";

const INIT_MESSAGES: Message[] = [
  { id: 1, type: "AI", content: "어떤 음식이 드시고 싶나요?" },
];

interface Message {
  id: number;
  type: "AI" | "USER" | "AI_ERROR";
  content: string;
}

interface AIChatProps {
  restaurantsData?: SearchKeywordResponse["documents"];
}

export default function AIChat({ restaurantsData }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>(INIT_MESSAGES);
  const [value, setValue] = useState("");
  const [messageId, setMessageId] = useState<number>(2);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, error]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    const trimValue = value.trim();
    if (trimValue.length === 0) return setValue("");
    setError(null);
    setIsLoading(true);

    const userMessage: Message = {
      id: messageId,
      type: "USER",
      content: trimValue,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setValue("");
    setMessageId((prevId) => prevId + 1);

    try {
      const response = await fetch("/api/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimValue, data: restaurantsData }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        setError(errorMessage.message);
        setIsLoading(false);
        return;
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;

      // 스트리밍 데이터를 누적하기 위한 변수
      let aiMessageContent = "";
      const aiMessageId = messageId + 1;
      const aiMessage: Message = { id: aiMessageId, type: "AI", content: "" };
      setMessageId((prevId) => prevId + 2);
      setMessages((prevMessages) => [...prevMessages, aiMessage]);

      if (reader) {
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            aiMessageContent += chunk;
            aiMessage.content = aiMessageContent;
            setMessages((prevMessages) =>
              prevMessages.map((msg) =>
                msg.id === aiMessageId ? { ...aiMessage } : msg,
              ),
            );
          }
        }
      }

      if (aiMessageContent.length === 0) {
        setError("응답 생성 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error generating message:", error);
      setError("응답 생성 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute left-4 top-4 z-10 flex h-[600px] w-[360px] flex-col items-center rounded-xl bg-neutral-100/90 py-4 shadow-xl">
      <span className="text-3xl font-semibold">AI Chat</span>
      <div className="my-2 flex w-full flex-1 flex-col gap-2 overflow-y-auto px-6 py-2">
        <>
          {messages.map((message) => (
            <Message
              key={message.id}
              type={message.type}
              content={message.content}
            />
          ))}
          {error && <Message type="AI_ERROR" content={error} />}
          <div ref={messagesEndRef} />
        </>
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
        <button
          disabled={isLoading}
          className="text-nowrap px-2 text-lg font-medium"
        >
          전송
        </button>
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
