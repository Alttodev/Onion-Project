import { AlertDialogModal } from "@/components/alertmodal/AlertModal";
import { DataTable } from "@/components/datatable";
import { CustomerDialog } from "@/components/modal/ListCreateModal";
import React from "react";

function CustomerList() {
  return (
    <div>
      <DataTable />
      <CustomerDialog />
      <AlertDialogModal />
    </div>
  );
}

export default CustomerList;
