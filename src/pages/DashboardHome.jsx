
import React from "react";
import { CustomerCreateDialog } from "../components/modal/CutomerCreateModal";
import { AlertDialogModal } from "../components/alertmodal/AlertModal";
import CustomersTable from "../components/CustomerTable";



function DashboardHome() {
  return (
    <>
      <CustomersTable />
      <CustomerCreateDialog />
      <AlertDialogModal />
    </>
  );
}

export default DashboardHome;
