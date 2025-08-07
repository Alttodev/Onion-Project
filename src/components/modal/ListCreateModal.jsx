import CustomerForm from "../form/CustomerCreate";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useZustandPopup } from "@/hooks/zustand";

export function CustomerDialog() {
  const { isOpen, closeModal, modelData } = useZustandPopup();
  // console.log(modelData,"modelData")

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="max-w-[525px] [&_button]:cursor-pointer">
        <DialogHeader>
          <DialogTitle className="text-[#037F69]">Customer Create</DialogTitle>
        </DialogHeader>
        <CustomerForm />
      </DialogContent>
    </Dialog>
  );
}
