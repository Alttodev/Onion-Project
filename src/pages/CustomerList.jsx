import { AlertDialogModal } from "@/components/alertmodal/AlertModal";
import DataTableComponent from "@/components/DataTablebk";
import { CustomerDialog } from "@/components/modal/ListCreateModal";
import React from "react";


function CustomerList() {
  return (
    <div>
      <DataTableComponent />
      <CustomerDialog />
      <AlertDialogModal />
    </div>
  );
}

export default CustomerList;
