
import React from "react";
import { CustomerCreateDialog } from "../components/modal/CutomerCreateModal";
import { AlertDialogModal } from "../components/alertmodal/AlertModal";
import CustomerTable from "../components/CustomerTable";



function DashboardHome() {
  return (
    <>
      <CustomerTable />
      <CustomerCreateDialog />
      <AlertDialogModal />
    </>
  );
}

export default DashboardHome;
