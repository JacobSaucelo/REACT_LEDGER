"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpFromDot,
  BanknoteArrowDown,
  BanknoteArrowUp,
  ChartColumnStacked,
} from "lucide-react";

export type TYPE_RECORD = {
  id: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  category: string;
  type: string;
  account_from: string;
  account_to: string;
  date: string;
  date_created: string;
  date_updated: string;
  created_by: string;
  updated_by: string;
  tags: string[];
  notes: string;
  attachments: any[];
  status: string;
};

export const CONFIG_COLUMNS: ColumnDef<TYPE_RECORD>[] = [
  {
    accessorKey: "title",
    header: "Name",
    cell: ({ row }) => {
      const type: string = row.original.title;
      const desc: string = row.original.description;
      return (
        <div>
          <p className="text-sm font-bold">{type}</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      const formatted = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "category",
    cell: ({ row }) => {
      const Category: string = row.getValue("category");

      return (
        <Badge className="text-right font-medium">
          <ChartColumnStacked />
          {Category}
        </Badge>
      );
    },
  },
  {
    accessorKey: "type",
    header: "type",
    cell: ({ row }) => {
      const type: string = row.getValue("type");

      if (type === "Income") {
        return (
          <Badge variant="outline" className="bg-blue-500">
            <ArrowUp />
            Income
          </Badge>
        );
      } else if (type === "Expense") {
        return (
          <Badge variant="outline" className="bg-red-500">
            <ArrowDown />
            Expense
          </Badge>
        );
      } else if (type === "Transfer") {
        return (
          <Badge variant="outline" className="bg-yellow-500">
            <ArrowRight />
            Transfer
          </Badge>
        );
      } else {
        return <Badge variant="outline">Unknown</Badge>;
      }
    },
  },
  { accessorKey: "account_from", header: "account_from" },
  { accessorKey: "account_to", header: "account_to" },
  { accessorKey: "date", header: "date" },
  { accessorKey: "date_created", header: "date_created" },
  { accessorKey: "date_updated", header: "date_updated" },
  { accessorKey: "created_by", header: "created_by" },
  { accessorKey: "updated_by", header: "updated_by" },
  { accessorKey: "tags", header: "tags" },
  { accessorKey: "notes", header: "notes" },
  // { accessorKey: "attachments", header: "attachments" },
  { accessorKey: "status", header: "status" },
];
