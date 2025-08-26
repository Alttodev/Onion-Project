import React from "react";

import { CustomerOrderDialog } from "../components/modal/CustomerOrderModal";
import { AlertDialogModal } from "../components/alertmodal/AlertModal";
import OrdersTable from "../components/OrdersTable";

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
