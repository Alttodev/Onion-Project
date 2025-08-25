import React from "react";
import OrdersTableFunction from "../components/OrdersTable";
import { CustomerOrderDialog } from "../components/modal/CustomerOrderModal";
import { AlertDialogModal } from "../components/alertmodal/AlertModal";

function CustomerOrders() {
  return (
    <div>
      <OrdersTableFunction />
      <CustomerOrderDialog />
      <AlertDialogModal />
    </div>
  );
}

export default CustomerOrders;
