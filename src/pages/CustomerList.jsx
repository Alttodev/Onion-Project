import { AlertDialogModal } from "@/components/alertmodal/AlertModal";
import CustomerTable from "@/components/CustomerTable";
import { CustomerDialog } from "@/components/modal/ListCreateModal";
import React from "react";


function CustomerList() {
  return (
    <div>
      <CustomerTable />
      <CustomerDialog />
      <AlertDialogModal />
    </div>
  );
}

export default CustomerList;
