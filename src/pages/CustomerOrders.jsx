import React from "react";

import { CustomerOrderDialog } from "../components/modal/CustomerOrderModal";
import { AlertDialogModal } from "../components/alertmodal/AlertModal";
import { OrderTable } from "../components/OrdersTable";

function CustomerOrders() {
  return (
    <div>
      <OrderTable />
      <CustomerOrderDialog />
      <AlertDialogModal />
    </div>
  );
}

export default CustomerOrders;
