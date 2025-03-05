"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/table-core";
import { flexRender, useReactTable } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteWeatherReport, getWeatherReports } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { convertToKelvin } from "@/lib/convertToKelvin";
import { WeatherReport } from "@/lib/types";

interface DataTableProps {
  onEditReport: (report: WeatherReport) => void;
}

export function DataTable({ onEditReport }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    await deleteWeatherReport(id);
    queryClient.invalidateQueries({ queryKey: ["weatherReports"] });
  };

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["weatherReports"],
    queryFn: getWeatherReports,
  });

  const columnHelper = createColumnHelper<WeatherReport>();

  const columns: ColumnDef<WeatherReport, any>[] = [
    columnHelper.accessor("temperature", {
      header: "Temperature",
      cell: (info) => convertToKelvin(info.getValue(), info.row.original.unit),
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("city", {
      header: "City",
      cell: (info) => info.getValue(),
      filterFn: "includesString",
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button onClick={() => onEditReport(row.original)}>Edit</Button>
          <Button
            variant="destructive"
            onClick={() => handleDelete(row.original.id)}
          >
            Delete
          </Button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: reports,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex gap-2 flex-col rounded-md border">
      <Input
        type="text"
        placeholder="Filter by city..."
        value={(table.getColumn("city")?.getFilterValue() as string) ?? ""}
        onChange={(e) =>
          table.getColumn("city")?.setFilterValue(e.target.value)
        }
      />

      <Table border={1} cellPadding={5} cellSpacing={0}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: "pointer" }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted() as string] ?? null}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
