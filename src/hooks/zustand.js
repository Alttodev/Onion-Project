import { create } from "zustand";

export const useZustandPopup = create((set) => ({
  isOpen: false,
  modalData: null,
  openModal: (data) => set({ isOpen: true, modalData: data }),
  closeModal: () => set({ isOpen: false, modalData: null }),
}));


export const useZustandAlertModal = create((set) => ({
  isOpen: false,
  modalData: null,
  fromData: null,
  openAlert: (data, from) =>
    set({ isOpen: true, modalData: data, fromData: from }),
  closeAlert: () => set({ isOpen: false, modalData: null, fromData: null }),
}));
