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
import { useState } from "react";
import { Badge } from "./ui/badge";
import { useZustandAlertModal, useZustandPopup } from "@/hooks/zustand";
import { SquarePen, Trash } from "lucide-react";
import { useCustomerList } from "@/hooks/customerhook";
import moment from "moment";
import TableDatePicker from "./forminputs/TableDatePicker";
import LoadingSpinner from "./spinnerloading";

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

  const { data: userData, isLoading: Loading } = useCustomerList({
    search: globalFilter,
    date: selectedDate ? selectedDate.toISOString() : undefined,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  // const users = useMemo(() => userData?.data, [userData]);

  const users = [
    {
      createdDate: "28-05-2025",
      updatedDate: "28-05-2025",
      unit: "2",
      amount: "1000",
      received: "500",
      balance: "500",
      status:"pending",
      id: "62323432",
    },
  ];

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
      header: "Created Date",
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
            onClick={() => openAlert(info.row.original._id)}
          />
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: users || [],
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
      <div className="flex justify-between items-center py-4">
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
          className="cursor-pointer bg-[#037F69] hover:bg-[#037F69]"
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
            className="cursor-pointer text-color"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer text-color"
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
