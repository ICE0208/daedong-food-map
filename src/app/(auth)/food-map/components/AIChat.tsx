"use client";

import { SearchKeywordResponse } from "@/types/apiTypes";
import Image from "next/image";
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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDoneLoading, setIsDoneLoading] = useState(false);
  const [isStartLoading, setIsStartLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, error]);

  useEffect(() => {
    if (!isDoneLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isDoneLoading]);

  const handleSubmit = async (
    e?: FormEvent<HTMLFormElement>,
    presetMessage?: string,
  ) => {
    if (e) e.preventDefault();
    if (isDoneLoading) return;
    const trimValue = presetMessage ? presetMessage : value.trim();
    if (trimValue.length === 0) return setValue("");
    setError(null);
    setIsDoneLoading(true);
    setIsStartLoading(true);

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
      setIsStartLoading(false);

      if (!response.ok) {
        const errorMessage = await response.json();
        setError(errorMessage.message);
        setIsDoneLoading(false);
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
      setIsDoneLoading(false);
      setIsStartLoading(false);
    }
  };

  return (
    <div className="absolute left-4 top-4 z-10 flex h-[520px] w-[300px] flex-col items-center rounded-xl bg-neutral-100/90 py-4 shadow-xl">
      <span className="text-3xl font-semibold">AI Chat</span>
      <div className="my-2 flex w-full flex-1 flex-col overflow-y-auto px-6 py-2">
        <div className="relative flex flex-1 flex-col gap-3">
          {messages.map((message) => (
            <Message
              key={message.id}
              type={message.type}
              content={message.content}
            />
          ))}
          {isStartLoading && <Message type="AI" content="생각중..." />}
          {error && <Message type="AI_ERROR" content={error} />}
          <div ref={messagesEndRef} />
          {messages.length < 2 && (
            <div className="absolute bottom-0 flex w-full flex-col items-center gap-2 py-2">
              <div className="mb-2 w-[100px]">
                <Image
                  src="/assets/images/chatbot.png"
                  alt="chat-bot"
                  width={512}
                  height={512}
                  className="p-1"
                />
              </div>
              <h3 className="text-xl font-semibold">- 추천 질문 -</h3>
              <button
                className="w-11/12 rounded-xl bg-white/80 py-2 font-medium shadow-md"
                onClick={() => handleSubmit(undefined, "주변 치킨집을 알려줘")}
                disabled={!Boolean(restaurantsData)}
              >
                주변 치킨집을 알려줘
              </button>
              <button
                className="w-11/12 rounded-xl bg-white/80 py-2 font-medium shadow-md"
                onClick={() =>
                  handleSubmit(undefined, "분식먹고 싶은데 추천해줘.")
                }
                disabled={!Boolean(restaurantsData)}
              >
                분식먹고 싶은데 추천해줘.
              </button>
              <button
                className="w-11/12 rounded-xl bg-white/80 py-2 font-medium shadow-md"
                onClick={() => handleSubmit(undefined, "오늘은 매운게 땡기네.")}
                disabled={!Boolean(restaurantsData)}
              >
                오늘은 매운게 땡기네.
              </button>
            </div>
          )}
        </div>
      </div>
      <form
        className="flex w-full items-center justify-center px-4"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full rounded-lg border-2 px-2 py-1 font-medium outline-none"
          value={isDoneLoading ? "답변 생성중" : value}
          style={isDoneLoading ? { color: "gray" } : {}}
          onChange={(e) => setValue(e.currentTarget.value)}
          required
          minLength={1}
          maxLength={50}
          placeholder="주변 음식점에 대해 질문하기"
          disabled={isDoneLoading || !Boolean(restaurantsData)}
          ref={inputRef}
        />
        <button
          disabled={isDoneLoading || !Boolean(restaurantsData)}
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
      className={`max-w-[80%] whitespace-pre-wrap rounded-lg px-3 py-2 ${messageStyles[type]} text-pretty break-words border-[1px] border-black/5 font-medium shadow-sm`}
    >
      {content}
    </div>
  );
};
