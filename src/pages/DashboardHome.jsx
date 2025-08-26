import { AlertDialogModal } from "@/components/alertmodal/AlertModal";
import CustomerTable from "@/components/CustomerTable";
import { CustomerCreateDialog } from "@/components/modal/CutomerCreateModal";
import React from "react";

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
