
import React from "react";

import { CustomerDialog } from "../components/modal/ListCreateModal";
import { AlertDialogModal } from "../components/alertmodal/AlertModal";
import DataTable from "../components/DataTable";

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
