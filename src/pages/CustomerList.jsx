
import React from "react";

import { CustomerDialog } from "../components/modal/ListCreateModal";
import { AlertDialogModal } from "../components/alertmodal/AlertModal";
import DatasTable from "../components/DataTable";

function CustomerList() {
  return (
    <div>
      <DatasTable />
      <CustomerDialog />
      <AlertDialogModal />
    </div>
  );
}

export default CustomerList;
