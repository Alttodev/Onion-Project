
import React from "react";
import { CustomerCreateDialog } from "../components/modal/CutomerCreateModal";
import { AlertDialogModal } from "../components/alertmodal/AlertModal";
import CustomerTableFunction from "../components/CustomerTable";

function DashboardHome() {
  return (
    <>
      <CustomerTableFunction />
      <CustomerCreateDialog />
      <AlertDialogModal />
    </>
  );
}

export default DashboardHome;
