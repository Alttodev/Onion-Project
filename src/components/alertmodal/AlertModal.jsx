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

import { toastSuccess } from "@/lib/toast";

export function AlertDialogModal() {
  const { closeAlert, isOpen } = useZustandAlertModal();

  const handleDelete = () => {
    try {
      toastSuccess("Customer Deleted Successfully!");
    } catch (error) {
      console.error("Error during delete action:", error);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && closeAlert()}>
      <AlertDialogContent className="max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row justify-end">
          <AlertDialogCancel className="cursor-pointer text-color">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer text-white bg-[#037F69] hover:bg-[#037F69]"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
