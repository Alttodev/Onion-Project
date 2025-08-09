import CustomerForm from "../form/CustomerCreate";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useZustandPopup } from "@/hooks/zustand";

export function CustomerDialog() {
  const { isOpen, closeModal, modalData } = useZustandPopup();
  const id = typeof modalData === "string" ? modalData : null;


  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent  className="max-w-[525px] [&_button]:cursor-pointer">
        <DialogHeader>
          <DialogTitle className="text-[#037F69]">{id?"Customer Update":"Customer Create"}</DialogTitle>
        </DialogHeader>
        <CustomerForm />
      </DialogContent>
    </Dialog>
  );
}
