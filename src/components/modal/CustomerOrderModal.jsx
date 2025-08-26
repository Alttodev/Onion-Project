import { useZustandPopup } from "@/hooks/zustand";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import CustomerOrderCreate from "../form/CustomerOrderCreate";



export function CustomerOrderDialog() {
  const { isOpen, closeModal, modalData } = useZustandPopup();
  const id = typeof modalData === "string" ? modalData : null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[525px] [&_button]:cursor-pointer">
        <DialogHeader>
          <DialogTitle className="text-emerald-600 flex justify-center">
            {id ? "Update" : "Create"}
          </DialogTitle>
        </DialogHeader>
        <CustomerOrderCreate />
      </DialogContent>
    </Dialog>
  );
}
