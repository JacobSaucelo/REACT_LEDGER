import { z } from "zod";
import {
  DATA_Category,
  DATA_Currency_Raw,
  DATA_STATUS,
  DATA_Type,
} from "./Form.Data";

const DATA_Currency = DATA_Currency_Raw.map((c) => c.name);

export const formSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, "Record title is required"),
  description: z.string().optional(),
  amount: z
    .number({
      error: "Enter a number",
    })
    .positive("Number must be positive"), // ensures > 0
  currency: z.enum(DATA_Currency),
  category: z.enum(DATA_Category),
  type: z.enum(DATA_Type),
  account_from: z.string().optional(),
  account_to: z.string().min(1, "Account is required"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  date_created: z.string().datetime().optional(),
  date_updated: z.string().datetime().optional(),
  created_by: z.string().optional(),
  updated_by: z.string().optional(),
  tags: z.string().optional(),
  notes: z.string().optional(),
  //   attachments: z.array(z.string()).default([]),
  status: z.enum(DATA_STATUS),
});
