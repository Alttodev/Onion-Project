import CustomerListForm from "../form/CustomerListCreate";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useZustandPopup } from "@/hooks/zustand";

export function CustomerDialog() {
  const { isOpen, closeModal, modalData } = useZustandPopup();
  const id = typeof modalData === "string" ? modalData : null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="max-w-[525px] [&_button]:cursor-pointer">
        <DialogHeader>
          <DialogTitle className="text-emerald-600 flex justify-center">
            {id ? "Update" : "Create"}
          </DialogTitle>
        </DialogHeader>
        <CustomerListForm />
      </DialogContent>
    </Dialog>
  );
}
