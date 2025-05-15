"use client";

import { useChatPartnerStore } from "@/stores/useChatPartnerStore";
import { useChatStore } from "@/stores/useChatStore";
import { useState, FormEvent, useRef } from "react";
import ChatItem from "@/components/ChatItem";

export default function ChatPage({ params }: { params?: {} }) {
  const { partner } = useChatPartnerStore();
  const { messages, addMessage } = useChatStore();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = async (e?: FormEvent<HTMLInputElement>) => {
    if (e) {
      e.preventDefault();
    }
    if (!input.length) return;
    addMessage({ role: "user", content: input });
    setLoading(true);
    setInput("");

    await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages,
        newMessage: input,
      }),
    })
      .then(async (res) => {
        setLoading(false);
        const aiReply = await res.json();
        console.log("ai content: ", aiReply.content);

        if (aiReply.content) {
          addMessage({ role: "ai", content: aiReply.content });
        } else {
          throw new Error("no rely content");
        }
      })
      .catch((err) => {
        console.log("err!", err);
      });

    inputRef?.current?.focus();
  };

  return (
    <div className="h-dvh w-full bg-white flex flex-col justify-between items-center">
      {/* header */}
      <div className="pt-5 flex justify-center items-center border-b-1 w-full pb-4 border-b-violet-100">
        {/* <Image
          src={`/${partner.style}Profile.png`}
          width={200}
          height={200}
          priority
          alt="cozy"
          className="rounded-full shadow-lg w-10 h-10 mr-3"
        /> */}
        <span className="text-gray-700 text-[1.2rem] font-semibold">
          {partner.style === "cozy" ? "편안한" : "쾌활한"} Momi
        </span>
      </div>

      <div className="box-border px-6 sm:px-10 w-full max-w-[50rem] flex flex-col h-full ">
        {/* chat box */}

        <div className=" w-full h-full mb-5 pt-5 scroll-auto">
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
        </div>

        <form className="flex gap-2 mt-auto pb-10">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onSubmit={(e) => sendMessage(e)}
            // onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border px-4 py-2 rounded-xl border-gray-300 outline-none "
            placeholder={
              loading ? "Momi가 열심히 답변하는 중..." : "메시지를 입력하세요"
            }
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-5 py-2 bg-violet-500 text-white font-bold rounded-xl cursor-pointer"
          >
            전송
          </button>
        </form>
      </div>

      {/* <button
        onClick={() => sendMessage()}
        className="w-30 h-30 mt-20 ml-30 bg-red-500"
      >
        눌러보세요. 채팅 테스트.
      </button> */}
    </div>
  );
}
