import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  createColumnHelper,
  getSortedRowModel,
} from "@tanstack/react-table";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useMemo, useState } from "react";
import { Badge } from "./ui/badge";
import { useZustandAlertModal, useZustandPopup } from "@/hooks/zustand";
import { SquarePen, Trash, MapPin, Phone } from "lucide-react";
import { useCustomerInfo, useCustomerListData } from "@/hooks/customerhook";
import moment from "moment";
import TableDatePicker from "./forminputs/TableDatePicker";
import LoadingSpinner from "./spinnerloading";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useParams } from "react-router-dom";

const columnHelper = createColumnHelper();

export function DataTable() {
  const [selectedDate, setSelectedDate] = useState(null);
  const { openModal } = useZustandPopup();
  const { openAlert } = useZustandAlertModal();
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
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

  const { data: customerInfo } = useCustomerInfo(customerId);
  const customerInfoData = useMemo(() => customerInfo?.data, [customerInfo]);

  const customerListData = useMemo(() => userData?.data, [userData]);

  const columns = [
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
      header: "Updated Date",
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
              value === "completed" ? "bg-green-500" : "bg-amber-500"
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

  return (
    <div className="w-full">
      <div className="bg-white mb-6">
        <div className="flex flex-row  sm:flex-row items-start sm:items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-[#037F69]">
            <AvatarImage src="/placeholder-user.png" alt="User Avatar" />
            <AvatarFallback className="bg-emerald-600 text-white text-[28px] font-semibold">
              {customerInfoData?.username?.charAt(0).toUpperCase() || "-"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              {customerInfoData?.username || "-"}
            </h2>

            <div className="flex flex-col gap-2">
              {/* Address */}
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-[#037F69]" />
                <span className="text-sm">
                  {customerInfoData?.address || "-"}
                </span>
              </div>

              <div className="text-gray-600">
                <a
                  href={
                    customerInfoData?.phone
                      ? `tel:${customerInfoData.phone}`
                      : "#"
                  }
                  className="inline-flex items-center gap-2"
                >
                  <Phone className="h-4 w-4 text-[#037F69]" />
                  <span className="text-sm">
                    {customerInfoData?.phone || "-"}
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Badge className="bg-emerald-600  text-white">
              Active Customer
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-10 py-4">
        <div className="flex gap-5">
          <Input
            placeholder="Search..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-xs h-10 bg-white"
          />
          <TableDatePicker
            placeholder="Select Date"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="max-w-xs h-10 bg-white"
          />
        </div>
        <Button
          className="cursor-pointer bg-emerald-600 hover:bg-emerald-600"
          onClick={openModal}
        >
          Create
        </Button>
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
        <div className="flex-1 text-sm text-muted-foreground">
          Page{pagination.pageIndex + 1} of {userData?.totalPages || 1}
        </div>
        <div className="flex items-center space-x-2">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px] text-color  border-[#037F69] cursor-pointer">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="text-color">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                  className="text-color  cursor-pointer"
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
