
import React from "react";
import DataTableFunction from "../components/DataTable";
import { CustomerDialog } from "../components/modal/ListCreateModal";
import { AlertDialogModal } from "../components/alertmodal/AlertModal";

function CustomerList() {
  return (
    <div>
      <DataTableFunction />
      <CustomerDialog />
      <AlertDialogModal />
    </div>
  );
}

export default CustomerList;
