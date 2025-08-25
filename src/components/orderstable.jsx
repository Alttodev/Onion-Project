import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  createColumnHelper,
  getSortedRowModel,
} from "@tanstack/react-table";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useMemo, useState } from "react";
import { Badge } from "./ui/badge";
import { useZustandAlertModal, useZustandPopup } from "@/hooks/zustand";
import { SquarePen, Trash, Plus, Download, Eye } from "lucide-react";
import { useCustomerName, useCustomerOrderData } from "@/hooks/customerhook";
import moment from "moment";
import TableDatePicker from "./forminputs/TableDatePicker";
import LoadingSpinner from "./SpinnerLoading";
import { Link } from "react-router-dom";
import axios from "axios";
import { toastError } from "@/lib/toast";

const columnHelper = createColumnHelper();

const OrdersTableFunction = () => {
  const API_URL = import.meta.env.VITE_APP_API_URL;
  const [selectedDate, setSelectedDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const { openModal } = useZustandPopup();
  const { openAlert } = useZustandAlertModal();
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: userData, isLoading: Loading } = useCustomerOrderData({
    search: globalFilter,
    from: selectedDate ? selectedDate.toISOString() : undefined,
    to: toDate ? toDate.toISOString() : undefined,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  const handleExport = async () => {
    try {
      if (!selectedDate && !toDate && !globalFilter) {
        toastError("Please provide at least one filter to export");
        return;
      }

      const params = new URLSearchParams();
      if (globalFilter) params.append("name", globalFilter);
      if (selectedDate)
        params.append("from", selectedDate.toISOString().split("T")[0]);
      if (toDate) params.append("to", toDate.toISOString().split("T")[0]);

      const response = await axios.get(
        `${API_URL}/export/excel?${params.toString()}`,
        { responseType: "blob" }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      const filenameParts = [
        "orders",
        globalFilter || "all",
        selectedDate ? selectedDate.toISOString().split("T")[0] : "start",
        toDate ? toDate.toISOString().split("T")[0] : "end",
      ];

      link.setAttribute("download", `${filenameParts.join("_")}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toastError(error?.response?.data?.message || error.message);
    }
  };

  const customerOrderData = useMemo(() => userData?.data, [userData]);

  const { data } = useCustomerName("username");

  const mergedData = useMemo(() => {
    if (!data?.data) return customerOrderData;

    return customerOrderData?.map((order) => {
      const match = data.data.find((c) => c._id === order.customerId);
      return { ...order, username: match ? match.username : "-" };
    });
  }, [customerOrderData, data]);
  const columns = [
    {
      id: "serial",
      header: "Sl. No",
      cell: (info) => info.row.index + 1,
    },
    columnHelper.accessor("username", {
      header: "Customer Name",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("unit", {
      header: "Kg",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("amount", {
      header: "Amount (₹)",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("received", {
      header: "Received (₹)",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("balance", {
      header: "Balance (₹)",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("createdDate", {
      header: "Purchased Date",
      cell: (info) => {
        const dateValue = info.getValue();
        if (!dateValue || !moment(dateValue).isValid()) {
          return "-";
        }
        return moment(dateValue).format("MMM D, YYYY");
      },
    }) || "-",
    columnHelper.accessor("updatedDate", {
      header: "Completed Date",
      cell: (info) => {
        const dateValue = info.getValue();
        if (!dateValue || !moment(dateValue).isValid()) {
          return "-";
        }
        return moment(dateValue).format("MMM D, YYYY");
      },
    }) || "-",

    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const value = info.getValue();

        if (!value) {
          return "-";
        }

        return (
          <Badge
            data-slot="badge"
            className={`rounded-full ${
              value === "completed"
                ? "bg-green-500"
                : value === "ordered"
                ? "bg-blue-500"
                : "bg-amber-500"
            }`}
          >
            {value}
          </Badge>
        );
      },
    }),

    columnHelper.accessor("actions", {
      header: "Actions",
      cell: (info) => (
        <div className="flex flex-row gap-2">
          <Link to={`/list/${info.row.original.customerId}`}>
            <Eye className="text-color w-5 h-5 cursor-pointer" />
          </Link>
          <SquarePen
            onClick={() => openModal(info.row.original._id)}
            className="text-color w-4 h-4 cursor-pointer"
          />
          <Trash
            className="text-red-400 w-4 h-4 cursor-pointer"
            onClick={() => openAlert(info.row.original._id, "order")}
          />
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: mergedData || [],
    columns,
    manualPagination: true,
    pageCount: userData?.totalPages ?? -1,
    state: {
      globalFilter,
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      <div className="text-emerald-600 text-xl font-semibold">Orders</div>
      <div className="flex flex-col-reverse xl:flex-row justify-between items-stretch md:items-center py-4 mt-5 md:mt-10 gap-3">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Input
            placeholder="Search..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="h-10 bg-white w-full sm:w-64"
          />
          <TableDatePicker
            placeholder="From Date"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="h-10 bg-white w-full sm:w-64"
          />
          <TableDatePicker
            placeholder="To Date"
            value={toDate}
            onChange={(date) => setToDate(date)}
            className="h-10 bg-white w-full sm:w-64"
          />
        </div>
        <div className="flex gap-2 justify-center items-center">
          <Button
            className="w-auto  cursor-pointer bg-emerald-600 hover:bg-emerald-600"
            onClick={handleExport}
          >
            <Download className="cursor-pointer text-white" />
            Export
          </Button>

          <Button
            className="w-auto  cursor-pointer bg-emerald-600 hover:bg-emerald-600 gap-1"
            onClick={openModal}
          >
            <Plus className="cursor-pointer text-white" />
            Create
          </Button>
        </div>
      </div>
      <div className="rounded-md border-2  border-solid border-gray-200 bg-white shadow-sm w-full overflow-x-auto">
        {Loading ? (
          <LoadingSpinner />
        ) : (
          <Table className="w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="border-b border-gray-300 font-semibold h-12"
                    >
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-b border-gray-300 h-12"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No data found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          Page{pagination.pageIndex + 1} of {userData?.totalPages || 1}
        </div> */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer text-color bg-transparent"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer text-color bg-transparent"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrdersTableFunction;
