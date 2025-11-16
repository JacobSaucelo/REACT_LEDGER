import { useState } from "react";
import { CONFIG_COLUMNS, TYPE_RECORD } from "./columns";
import { DataTable } from "./data-table";

const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export default function TableTransactionsMain() {
  const [DATA_RECORDS, SET_DATA_RECORDS] = useState<TYPE_RECORD[]>([
    {
      id: generateUUID(),
      title: "Initial Deposit",
      description: "Opening balance",
      amount: 5000,
      currency: "USD",
      category: "Savings",
      type: "Income",
      account_from: "",
      account_to: "Main Account",
      date: "2024-01-01",
      date_created: new Date("2024-01-01").toISOString(),
      date_updated: new Date("2024-01-01").toISOString(),
      created_by: "user_001",
      updated_by: "user_001",
      tags: ["initial", "savings"],
      notes: "Initial account setup",
      attachments: [],
      status: "Active",
    },
    {
      id: generateUUID(),
      title: "Salary",
      description: "Monthly salary",
      amount: 3500,
      currency: "USD",
      category: "Income",
      type: "Income",
      account_from: "Employer",
      account_to: "Main Account",
      date: "2024-01-15",
      date_created: new Date("2024-01-15").toISOString(),
      date_updated: new Date("2024-01-15").toISOString(),
      created_by: "user_001",
      updated_by: "user_001",
      tags: ["salary", "income"],
      notes: "",
      attachments: [],
      status: "Active",
    },
    {
      id: generateUUID(),
      title: "Rent Payment",
      description: "Monthly rent",
      amount: 1200,
      currency: "USD",
      category: "Housing",
      type: "Expense",
      account_from: "Main Account",
      account_to: "Landlord",
      date: "2024-01-05",
      date_created: new Date("2024-01-05").toISOString(),
      date_updated: new Date("2024-01-05").toISOString(),
      created_by: "user_001",
      updated_by: "user_001",
      tags: ["rent", "housing"],
      notes: "",
      attachments: [],
      status: "Active",
    },
    {
      id: generateUUID(),
      title: "Groceries",
      description: "Weekly groceries",
      amount: 350,
      currency: "USD",
      category: "Food",
      type: "Expense",
      account_from: "Main Account",
      account_to: "Supermarket",
      date: "2024-01-10",
      date_created: new Date("2024-01-10").toISOString(),
      date_updated: new Date("2024-01-10").toISOString(),
      created_by: "user_001",
      updated_by: "user_001",
      tags: ["food", "groceries"],
      notes: "",
      attachments: [],
      status: "Active",
    },
    {
      id: generateUUID(),
      title: "Utilities",
      description: "Electric and water",
      amount: 180,
      currency: "USD",
      category: "Bills",
      type: "Expense",
      account_from: "Main Account",
      account_to: "Utility Company",
      date: "2024-01-12",
      date_created: new Date("2024-01-12").toISOString(),
      date_updated: new Date("2024-01-12").toISOString(),
      created_by: "user_001",
      updated_by: "user_001",
      tags: ["bills", "utilities"],
      notes: "",
      attachments: [],
      status: "Active",
    },
  ]);

  return (
    <div className="mx-auto">
      <DataTable columns={CONFIG_COLUMNS} data={DATA_RECORDS} />
    </div>
  );
}
