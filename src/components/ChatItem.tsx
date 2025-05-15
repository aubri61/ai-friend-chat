import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function ChatItem({
  partnerStyle,
  role,
  message,
  delay,
}: {
  partnerStyle: string;
  role: string;
  message: string;
  delay?: boolean;
}) {
  return (
    <motion.div
      className={clsx(
        "flex  gap-1 mb-4 items-start mx-w-auto w-[90%]",
        role === "model" ? "justify-start" : "justify-end ml-auto"
      )}
      // className="flex w-auto gap-1 mb-4 items-start"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: delay ? 0.5 : 0,
      }}
    >
      {role === "model" && (
        <Image
          src={`/${partnerStyle}Profile.png`}
          width={200}
          height={200}
          priority
          alt="cozy"
          className="rounded-full shadow-lg w-9 h-9 mr-3"
        />
      )}
      <span
        className={clsx(
          "rounded-2xl px-4 py-2",
          role === "model" ? "bg-gray-50 text-gray-800" : "bg-violet-50 text-violet-950"
        )}
      >
        {message}
      </span>
    </motion.div>
  );
  // if (role === "partenr") return <div>{message}</div>;
  // else {
  //   return <div>1234</div>;
  // }
}
