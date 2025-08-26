import React from "react";
import { CustomerDialog } from "../components/modal/ListCreateModal";
import { AlertDialogModal } from "../components/alertmodal/AlertModal";
import CustomerDataTable from "../components/DataTable";

function CustomerList() {
  return (
    <div>
      <CustomerDataTable />
      <CustomerDialog />
      <AlertDialogModal />
    </div>
  );
}

export default CustomerList;
