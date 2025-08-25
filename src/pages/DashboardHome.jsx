
import React from "react";
import CustomerTableFunction from "../components/CustomerTable";
import { CustomerCreateDialog } from "../components/modal/CutomerCreateModal";
import { AlertDialogModal } from "../components/alertmodal/AlertModal";

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
