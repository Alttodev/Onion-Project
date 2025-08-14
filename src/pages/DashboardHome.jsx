import { AlertDialogModal } from "@/components/alertmodal/AlertModal";
import { CustomerTable } from "@/components/customertable";
import { CustomerCreateDialog } from "@/components/modal/CutomerCreateModal";
import { ScrollToTop } from "@/components/scrolltop";
import React from "react";

function DashboardHome() {
  return (
    <>
      <CustomerTable />
      <CustomerCreateDialog />
       <AlertDialogModal />
      <ScrollToTop />
    </>
  );
}

export default DashboardHome;
