"use client";

import Image from "next/image";
import { useChatPartnerStore } from "@/stores/useChatPartnerStore";
import { ChatPartnerStyle } from "@/stores/useChatPartnerStore";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { HiOutlineGlobe } from "react-icons/hi";
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default function HomePage() {
  const { setPartner } = useChatPartnerStore();
  const t = useTranslations("HomePage");

  const router = useRouter();

  const onStyleClick = (style: ChatPartnerStyle) => {
    setPartner({ style: style });
    router.push("/chat");
  };

  return (
    <div className="h-dvh relative bg-white flex justify-center items-center flex-col">
      <div className="absolute top-10 right-10 flex gap-1 justify-center items-center">
        <HiOutlineGlobe />
        <LocaleSwitcher />
      </div>

      <h1 className="text-3xl text-gray-950">{t("only-me")}</h1>
      <h2 className="text-4xl font-bold text-violet-500 mt-5 mb-15">Momi</h2>

      <div className="mb-10 text-lg text-gray-800">{t("choose")}</div>

      <div className="flex gap-6 sm:gap-12">
        <div
          className="flex flex-col justify-center items-center gap-8 cursor-pointer w-50 h-55 sm:w-65 sm:h-70 text-[1.1rem] hover:text-violet-600 hover:text-[1.25rem] focus:text-[1.2rem] hover:font-bold focus:text-violet-600 focus:font-bold  transition-all"
          onClick={() => onStyleClick("cozy")}
        >
          <Image
            src={"/cozyProfile.png"}
            width={200}
            height={200}
            priority
            alt="cozy"
            className="rounded-full shadow-xl w-40 h-40 sm:w-55 sm:h-55 hover:w-45 hover:h-45 sm:hover:w-60 sm:hover:h-60 transition-all"
          />
          <span className="font-semibold  ">{t("cozy-momi")}</span>
        </div>
        <div
          className="flex flex-col justify-center items-center gap-8 cursor-pointer w-50 h-55 sm:w-65 sm:h-70 text-[1.1rem] hover:text-violet-600 hover:text-[1.25rem] focus:text-[1.2rem] hover:font-bold focus:text-violet-600 focus:font-bold  transition-all"
          onClick={() => onStyleClick("cheery")}
        >
          <Image
            src={"/cheeryProfile.png"}
            width={200}
            height={200}
            priority
            alt="cheery"
            className="rounded-full shadow-xl w-40 h-40 sm:w-55 sm:h-55 hover:w-45 hover:h-45 sm:hover:w-60 sm:hover:h-60 transition-all"
          />
          <span className="font-semibold  ">{t("cheery-momi")}</span>
        </div>
      </div>
    </div>
  );
}
