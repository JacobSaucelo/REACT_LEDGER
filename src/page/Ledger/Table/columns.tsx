"use client";

import { ColumnDef } from "@tanstack/react-table";

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
  date: string; // ISO or YYYY-MM-DD
  date_created: string; // ISO timestamp
  date_updated: string; // ISO timestamp
  created_by: string;
  updated_by: string;
  tags: string[];
  notes: string;
  attachments: any[];
  status: string;
};

export const CONFIG_COLUMNS: ColumnDef<TYPE_RECORD>[] = [
  { accessorKey: "id", header: "id" },
  { accessorKey: "title", header: "title" },
  { accessorKey: "description", header: "description" },
  { accessorKey: "amount", header: "amount" },
  { accessorKey: "currency", header: "currency" },
  { accessorKey: "category", header: "category" },
  { accessorKey: "type", header: "type" },
  { accessorKey: "account_from", header: "account_from" },
  { accessorKey: "account_to", header: "account_to" },
  { accessorKey: "date", header: "date" },
  { accessorKey: "date_created", header: "date_created" },
  { accessorKey: "date_updated", header: "date_updated" },
  { accessorKey: "created_by", header: "created_by" },
  { accessorKey: "updated_by", header: "updated_by" },
  { accessorKey: "tags", header: "tags" },
  { accessorKey: "notes", header: "notes" },
  { accessorKey: "attachments", header: "attachments" },
  { accessorKey: "status", header: "status" },
];
