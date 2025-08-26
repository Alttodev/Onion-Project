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
import { Eye, Plus, SquarePen, Trash } from "lucide-react";
import moment from "moment";
import TableDatePicker from "./forminputs/TableDatePicker";
import LoadingSpinner from "./spinnerloading";
import { Link } from "react-router-dom";
import { useZustandAlertModal, useZustandPopup } from "../hooks/zustand";
import { useCustomerList } from "../hooks/customerhook";

const columnHelper = createColumnHelper();

const CustomerTable = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { openModal } = useZustandPopup();
  const { openAlert } = useZustandAlertModal();
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: userData, isLoading: Loading } = useCustomerList({
    search: globalFilter,
    date: selectedDate ? selectedDate.toISOString() : undefined,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  const users = useMemo(() => userData?.data, [userData]);

  const columns = [
    {
      id: "serial",
      header: "Sl. No",
      cell: (info) => info.row.index + 1,
    },
    columnHelper.accessor("username", {
      header: "Customer Name",
      cell: (info) => info.getValue() || "-",
      // rounded-full bg-emerald-500
    }),
    columnHelper.accessor("date", {
      header: "Created Date",
      cell: (info) => {
        const dateValue = info.getValue();
        if (!dateValue || !moment(dateValue).isValid()) {
          return "-";
        }
        return moment(dateValue).format("MMM D, YYYY");
      },
    }) || "-",
    columnHelper.accessor("address", {
      header: "Address",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("phone", {
      header: "Phone",
      cell: (info) => {
        const value = info.getValue();
        if (!value) return "-";
        let digits = value.replace(/\D/g, "");
        if (digits.startsWith("91")) {
          digits = digits.slice(2);
        }
        return digits;
      },
    }),

    columnHelper.accessor("actions", {
      header: "Actions",
      cell: (info) => (
        <div className="flex flex-row gap-2">
          <Link to={`/list/${info.row.original._id}`}>
            <Eye className="text-color w-5 h-5 cursor-pointer" />
          </Link>
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
      <div className="flex items-center gap-2 text-lg md:text-xl text-emerald-600 font-bold">
        <span>Hi, welcome back</span>
        <span className="animate-wave">👋</span>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between items-stretch md:items-center py-4 mt-5 gap-3">
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
        <div className="flex justify-center items-center">
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
export default  CustomerTable
