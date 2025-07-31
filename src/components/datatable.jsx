import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  createColumnHelper,
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

const columnHelper = createColumnHelper();

const defaultData = [
  {
    id: 1,
    no: "1",
    name: "Alice",
    status: "Pending",
    kg: "1",
    amount: "500",
    date: "2023-10-01",
    received: "250",
    pending: "250",
  },
  {
    id: 2,
    no: "2",
    name: "Bob",
    status: "Pending",
    kg: "5",
    amount: "300",
    date: "2023-07-01",
    received: "150",
    pending: "150",
  },
  {
    id: 3,
    no: "3",
    name: "Charlie",
    status: "Pending",
    kg: "3",
    amount: "200",
    date: "2023-10-01",
    received: "100",
    pending: "100",
  },
  {
    id: 4,
    no: "4",
    name: "David",
    status: "Completed",
    kg: "7",
    amount: "100",
    date: "2023-05-01",
    received: "50",
    pending: "50",
  },
  {
    id: 5,
    no: "5",
    name: "Eve",
    status: "Pending",
    kg: "10",
    amount: "500",
    date: "2023-10-01",
    received: "50",
    pending: "250",
  },
  {
    id: 6,
    no: "6",
    name: "Frank",
    status: "Completed",
    kg: "2",
    amount: "700",
    date: "2023-10-01",
    received: "600",
    pending: "100",
  },
  {
    id: 7,
    no: "7",
    name: "Grace",
    status: "Pending",
    kg: "20",
    amount: "800",
    date: "2023-02-01",
    received: "700",
    pending: "100",
  },
  {
    id: 8,
    no: "8",
    name: "Heidi",
    status: "Completed",
    kg: "30",
    amount: "1000",
    date: "2023-10-06",
    received: "500",
    pending: "500",
  },
  {
    id: 9,
    no: "9",
    name: "Ivan",
    status: "Completed",
    kg: "2",
    amount: "10000",
    date: "2023-10-08",
    received: "5000",
    pending: "5000",
  },
  {
    id: 10,
    no: "10",
    name: "Judy",
    status: "Pending",
    kg: "4",
    amount: "10000",
    date: "2023-10-01",
    received: "5000",
    pending: "5000",
  },
  {
    id: 11,
    no: "11",
    name: "Kevin",
    status: "Completed",
    kg: "2",
    amount: "20000",
    date: "2023-10-01",
    received: "10000",
    pending: "10000",
  },
  {
    id: 12,
    no: "12",
    name: "Liam",
    status: "Completed",
    kg: "3",
    amount: "10000",
    date: "2023-10-01",
    received: "5000",
    pending: "5000",
  },
  {
    id: 13,
    no: "13",
    name: "Mia",
    status: "Completed",
    kg: "2",
    amount: "10000",
    date: "2023-10-01",
    received: "5000",
    pending: "5000",
  },
  {
    id: 14,
    no: "14",
    name: "Noah",
    status: "Completed",
    kg: "4",
    amount: "20000",
    date: "2023-10-01",
    received: "10000",
    pending: "10000",
  },
  {
    id: 15,
    no: "15",
    name: "Olivia",
    status: "Completed",
    role: "2",
    amount: "500",
    date: "2023-10-01",
    received: "250",
    pending: "250",
  },
];

export function DataTable({ data = defaultData }) {
  const { openModal } = useZustandPopup();
  const { openAlert } = useZustandAlertModal();
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const columns = [
    columnHelper.accessor("no", {
      header: "No",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("kg", {
      header: "Kg",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("amount", {
      header: "Amount (₹)",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("received", {
      header: "Received (₹)",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("pending", {
      header: "Balance (₹)",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <Badge
          data-slot="badge"
          className={`rounded-full ${
            info.getValue().toLowerCase() === "completed"
              ? "bg-green-500 "
              : "bg-amber-500"
          }`}
        >
          {info.getValue()}
        </Badge>
      ),
    }),
    columnHelper.accessor("actions", {
      header: "Actions",
      cell: (info) => (
        console.log(info),
        (
          <div className="flex flex-row gap-2">
            <SquarePen
              onClick={openModal}
              className="text-color w-4 h-4 cursor-pointer"
            />
            <Trash
              className="text-red-400 w-4 h-4 cursor-pointer"
              onClick={openAlert}
            />
          </div>
        )
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    state: {
      globalFilter,
      pagination,
    },
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-xs h-10 bg-white"
        />
        <Button
          className="cursor-pointer bg-[#037F69] hover:bg-[#037F69]"
          onClick={openModal}
        >
          Create
        </Button>
      </div>
      <div className="rounded-md border-2  border-solid border-gray-200 bg-white shadow-sm w-full overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="border-b border-gray-300 font-semibold h-12"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
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
