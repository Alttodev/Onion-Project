import { AlertDialogModal } from "@/components/alertmodal/AlertModal";
import { CustomerOrderDialog } from "@/components/modal/CustomerOrderModal";
import OrdersTable from "@/components/OrdersTable";
import React from "react";


function CustomerOrders() {
  return (
    <div>
      <OrdersTable />
      <CustomerOrderDialog />
      <AlertDialogModal />
    </div>
  );
}

export default CustomerOrders;
