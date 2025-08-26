import { AlertDialogModal } from "@/components/alertmodal/AlertModal";
import { CustomerOrderDialog } from "@/components/modal/CustomerOrderModal";
import OrdersTableComponent from "@/components/OrdersTablebk";
import React from "react";


function CustomerOrders() {
  return (
    <div>
      <OrdersTableComponent />
      <CustomerOrderDialog />
      <AlertDialogModal />
    </div>
  );
}

export default CustomerOrders;
