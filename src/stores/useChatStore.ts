import { create } from "zustand";

interface ChatMessage {
  role: "user" | "ai";
  content: string;
}

interface ChatStore {
  messages: ChatMessage[];
  addMessage: (msg: ChatMessage) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  clearMessages: () => set({ messages: [] }),
}));
