import { useZustandAlertModal } from "@/hooks/zustand";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

import { toastError, toastSuccess } from "@/lib/toast";
import { useCustomerDelete } from "@/hooks/customerhook";

export function AlertDialogModal() {
  const { closeAlert, isOpen, modalData } = useZustandAlertModal();

  const id = typeof modalData === "string" ? modalData : null;
  const { mutateAsync: deleteData } = useCustomerDelete();

  const handleDelete = async () => {
    try {
      const res = await deleteData(id);
      toastSuccess(res?.message);
    } catch (error) {
      toastError(error?.response?.data?.message);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && closeAlert()}>
      <AlertDialogContent className="max-w-[325px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row justify-end">
          <AlertDialogCancel className="cursor-pointer text-color">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer text-white bg-emerald-600 hover:bg-emerald-600"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
