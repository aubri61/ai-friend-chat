"use client";

import { useChatPartnerStore } from "@/stores/useChatPartnerStore";
import { useChatStore } from "@/stores/useChatStore";
import { useState, useRef, SyntheticEvent } from "react";
import ChatItem from "@/components/ChatItem";
import clsx from "clsx";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";

export default function ChatPage({ params }: { params?: {} }) {
  const { partner } = useChatPartnerStore();
  const { messages, addMessage } = useChatStore();

  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // const [showStyleDropdown, setShowStyleDropdown] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async (e?: SyntheticEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (!input.length) return;
    addMessage({ role: "user", content: input });
    // setLoading(true);
    setInput("");

    // await fetch("/api/chat", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     messages,
    //     newMessage: input,
    //   }),
    // })
    //   .then(async (res) => {
    //     setLoading(false);
    //     const aiReply = await res.json();
    //     console.log("ai content: ", aiReply.content);

    //     if (aiReply.content) {
    //       addMessage({ role: "ai", content: aiReply.content });
    //     } else {
    //       throw new Error("no rely content");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("err!", err);
    //   });
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

    inputRef?.current?.focus();
  };

  // const onChevronClick = () => {
  //   setShowStyleDropdown(!showStyleDropdown);
  // };

  // const onStyleClick = () => {
  //   setPartner({ style: partner.style === "cozy" ? "cheery" : "cozy" });

  // };

  return (
    <div className="h-dvh flex flex-col bg-white ">
      {/* Header */}
      <div className="pt-5 pb-4 border-b border-violet-100 flex justify-center items-center gap-2 relative select-none">
        <span className="text-gray-700 text-[1.2rem] font-semibold">
          {partner.style === "cozy" ? "편안한" : "쾌활한"} Momi
        </span>
        {/* {!showStyleDropdown ? (
          <IoChevronDownOutline
            className="cursor-pointer"
            onClick={onChevronClick}
          />
        ) : (
          <IoChevronUpOutline
            className="cursor-pointer"
            onClick={onChevronClick}
          />
        )}

        {showStyleDropdown && (
          <div className="absolute top-full -mt-1 bg-white border border-gray-200 shadow-xl rounded-2xl px-10 py-4 z-10">
            <span
              onClick={() => {
                onStyleClick();
              }}
              className="text-gray-600 text-[1.1rem] hover:text-violet-500 hover:font-semibold cursor-pointer"
            >
              {partner.style === "cozy" ? "쾌활한 Momi" : "편안한 Momi"}
            </span>
          </div>
        )} */}
      </div>

      {/* Chat Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-10 pt-5 scrollbar-none scroll-auto">
        <ChatItem
          role="ai"
          message="안녕, 나는 네 친구 Momi야. 오늘은 어떤 이야기를 하고 싶어?"
          partnerStyle={partner.style}
          delay
        />
        {messages.map((msg, idx) => (
          <ChatItem
            key={idx}
            role={msg.role}
            message={msg.content}
            partnerStyle={partner.style}
          />
        ))}

        {/* 스크롤 트리거용 빈 div */}
        <div ref={bottomRef} />
      </div>

      {/* Input Form */}
      <form className="flex gap-2 px-6 sm:px-10 py-5">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(e)}
          className="flex-1 border px-4 py-2 rounded-xl border-gray-300 outline-none"
          placeholder={
            loading ? "Momi가 열심히 답변하는 중..." : "메시지를 입력하세요"
          }
          disabled={loading}
        />
        <button
          onClick={(e) => sendMessage(e)}
          disabled={loading}
          className={clsx(
            "px-5 py-2 font-bold rounded-xl cursor-pointer",

            loading ? "bg-gray-400 text-gray-700" : " bg-violet-500 text-white"
          )}
        >
          {loading ? "대기" : "전송"}
        </button>
      </form>
    </div>
  );
}
