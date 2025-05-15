import { create } from "zustand";

export type ChatPartnerStyle = "cozy" | "cheery";

type Partner = {
  style: ChatPartnerStyle;
};

// 초기값 정의
const defaultPartner: Partner = {
  style: "cozy",
};
type PartnerState = {
  partner: Partner;
  setPartner: (partner: Partner) => void;
  clearParner: () => void;
};

export const useChatPartnerStore = create<PartnerState>((set) => ({
  // 기본값 설정.
  partner: defaultPartner,
  // partner: null,
  setPartner: (partner) => set({ partner }),
  clearParner: () => set({ partner: defaultPartner }),
}));
