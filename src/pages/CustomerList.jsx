import { AlertDialogModal } from "@/components/alertmodal/AlertModal";
import DataTable from "@/components/DataTable";
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
