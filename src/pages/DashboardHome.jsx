import { AlertDialogModal } from "@/components/alertmodal/AlertModal";
import { DataTable } from "@/components/datatable";
import { CustomerDialog } from "@/components/modal/ListCreateModal";
import { ScrollToTop } from "@/components/scrolltop";
import React from "react";

function DashboardHome() {
  return (
    <>
      <DataTable />
      <CustomerDialog />
      <AlertDialogModal />
      <ScrollToTop />
    </>
  );
}

export default DashboardHome;
