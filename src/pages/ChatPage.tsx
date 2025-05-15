"use client";

import { useChatPartnerStore } from "@/stores/useChatPartnerStore";
import { useChatStore } from "@/stores/useChatStore";
import { useState, useRef, SyntheticEvent } from "react";
import ChatItem from "@/components/ChatItem";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { HiOutlineGlobe } from "react-icons/hi";
// import { useParams } from "next/navigation";

export default function ChatPage() {
  const t = useTranslations("ChatPage");
  // const { locale } = useParams() as { locale: string };

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
    setLoading(true);
    setInput("");

    await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages,
        newMessage: input,
        style: partner.style,
        locale: "en",
      }),
    })
      .then(async (res) => {
        setLoading(false);
        const aiReply = await res.json();
        console.log("ai content: ", aiReply.content);

        if (aiReply.content) {
          addMessage({ role: "model", content: aiReply.content });
        } else {
          throw new Error("no rely content");
        }
      })
      .catch((err) => {
        console.log("err!", err);
      });
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

    inputRef?.current?.focus();
  };

  return (
    <div className="h-dvh flex relative flex-col bg-white items-center">
      {/* Header */}
      <div className="pt-5 pb-4 border-b border-violet-100 flex justify-center items-center gap-2 relative select-none w-full">
        <span className="text-gray-700 text-[1.2rem] font-semibold">
          {partner.style === "cozy" ? t("cozy") : t("cheery")} Momi
        </span>
        <div className="absolute top-1/2  -translate-y-1/2 z-100 right-10 flex gap-1 justify-center items-center">
          <HiOutlineGlobe />
          <LocaleSwitcher />
        </div>
      </div>

      {/* Chat Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-10 sm:max-w-[50rem] w-full pt-5 scroll-auto">
        <ChatItem
          role="model"
          message={t("greeting")}
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
      <form className="flex gap-2 px-6 sm:px-10 py-5 mb-5 sm:max-w-[50rem] w-full">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(e)}
          className="flex-1 border px-4 py-3 rounded-xl border-gray-300 outline-none"
          placeholder={loading ? t("placeholder-wait") : t("placeholder")}
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
          {loading ? t("wait") : t("send")}
        </button>
      </form>
    </div>
  );
}
