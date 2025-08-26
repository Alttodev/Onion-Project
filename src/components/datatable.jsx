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
import { SquarePen, Trash, MapPin, Phone, Plus, Download } from "lucide-react";
import moment from "moment";
import TableDatePicker from "./forminputs/TableDatePicker";
import LoadingSpinner from "./SpinnerLoading";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useParams } from "react-router-dom";
import { TableSkeleton } from "./skeleton/TableSkeleton";
import { useZustandAlertModal, useZustandPopup } from "../hooks/zustand";
import { useCustomerInfo, useCustomerListData } from "../hooks/customerhook";

const columnHelper = createColumnHelper();

const DataTable=()=> {
  const [selectedDate, setSelectedDate] = useState(null);
  const { openModal } = useZustandPopup();
  const { openAlert } = useZustandAlertModal();
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const params = useParams();
  const customerId = params?.id;

  const { data: userData, isLoading: Loading } = useCustomerListData(
    {
      search: globalFilter,
      date: selectedDate ? selectedDate.toISOString() : undefined,
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    },
    customerId
  );

  const { data: customerInfo, isFetching: dataFetching } =
    useCustomerInfo(customerId);
  const customerInfoData = useMemo(() => customerInfo?.data, [customerInfo]);

  const customerListData = useMemo(() => userData?.data, [userData]);

  const columns = [
    {
      id: "serial",
      header: "Sl. No",
      cell: (info) => info.row.index + 1,
    },
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
          <SquarePen
            onClick={() => openModal(info.row.original._id)}
            className="text-color w-4 h-4 cursor-pointer"
          />
          <Trash
            className="text-red-400 w-4 h-4 cursor-pointer"
            onClick={() => openAlert(info.row.original._id, "list")}
          />
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: customerListData || [],
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

  if (dataFetching) {
    return <TableSkeleton />;
  }

  return (
    <div className="w-full">
      <div className="bg-white mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <Avatar className="h-16 w-16 border-2 border-[#037F69]">
              <AvatarImage src="/placeholder-user.png" alt="User Avatar" />
              <AvatarFallback className="bg-emerald-600 text-white text-[20px] font-semibold">
                {customerInfoData?.username?.charAt(0).toUpperCase() || "-"}
              </AvatarFallback>
            </Avatar>

            {/* User Info */}
            <div className="flex flex-col gap-2">
              {/* Username */}
              <h2 className="text-xl font-semibold text-gray-900">
                {customerInfoData?.username || "-"}
              </h2>

              {/* Address */}
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-[#037F69]" />
                <span className="text-sm">
                  {customerInfoData?.address || "-"}
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4 text-[#037F69]" />
                <a
                  href={
                    customerInfoData?.phone
                      ? `tel:${customerInfoData.phone}`
                      : "#"
                  }
                  className="text-sm hover:text-[#037F69] transition-colors"
                >
                  {customerInfoData?.phone || "-"}
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center sm:items-start">
            <Badge className="bg-emerald-600 text-white px-3 py-1 rounded-lg shadow-sm">
              Active Customer
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-between items-stretch md:items-center py-4 mt-10 gap-3">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Input
            placeholder="Search..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="h-10 bg-white w-full sm:w-64"
          />
          <TableDatePicker
            placeholder="Select Date"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="h-10 bg-white w-full sm:w-64"
          />
        </div>
        <div className="flex gap-2 justify-center items-center">
          {/* <Button
            className="w-auto  cursor-pointer bg-emerald-600 hover:bg-emerald-600"
            // onClick={openModal}
          >
            <Download className="cursor-pointer text-white" />
            Export
          </Button> */}
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
}

export default DataTable
