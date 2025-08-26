import { AlertDialogModal } from "@/components/alertmodal/AlertModal";
import CustomerTableComponent from "@/components/customertable";
import { CustomerCreateDialog } from "@/components/modal/CutomerCreateModal";
import React from "react";

function DashboardHome() {
  return (
    <>
      <CustomerTableComponent />
      <CustomerCreateDialog />
      <AlertDialogModal />
    </>
  );
}

export default DashboardHome;
