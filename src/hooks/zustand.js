import { create } from "zustand";

export const useZustandPopup = create((set) => ({
  isOpen:false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}))


export const useZustandAlertModal = create((set) => ({
  isOpen:false,
  openAlert: () => set({ isOpen: true }),
  closeAlert: () => set({ isOpen: false }),
}))


