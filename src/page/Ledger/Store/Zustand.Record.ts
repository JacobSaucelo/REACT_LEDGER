import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface INTERFACE_Record {
  // GENERAL DETAILS
  STORE_Title: string;
  STORE_Description: string;
  STORE_Amount: number;
  STORE_Currency: "PHP" | "USD" | "EUR" | string;
  STORE_Category: string;
  STORE_Type: "Income" | "Expense" | "Transfer";

  // MORE DETAILS
  STORE_Account_From: string;
  STORE_Account_To: string;
  STORE_Date: string;
  STORE_Tags: string[];
  STORE_Notes: string;
  STORE_Attachment: string[];

  // SYSTEM / AUDIT DETAILS
  STORE_Date_Created: string;
  STORE_Date_Updated: string;
  STORE_Created_By: string;
  STORE_Updated_By: string;
  STORE_Status: "Active" | "Inactive" | "Archived" | "Deleted";
}

const ZUSTAND_Initial_Record: INTERFACE_Record = {
  STORE_Title: "",
  STORE_Description: "",
  STORE_Amount: 0,
  STORE_Currency: "PHP",
  STORE_Category: "Restocking",
  STORE_Type: "Income",

  STORE_Account_From: "JS",
  STORE_Account_To: "Main",
  STORE_Date: new Date().toISOString().split("T")[0],
  STORE_Tags: [],
  STORE_Notes: "",
  STORE_Attachment: [],

  STORE_Date_Created: new Date().toISOString(),
  STORE_Date_Updated: new Date().toISOString(),
  STORE_Created_By: "JS",
  STORE_Updated_By: "JS",
  STORE_Status: "Active",
};

interface INTERFACE_Record_Store {
  Records: INTERFACE_Record;
  setTransaction: (data: Partial<INTERFACE_Record>) => void;
  setField: <K extends keyof INTERFACE_Record>(
    field: K,
    value: INTERFACE_Record[K]
  ) => void;
  resetTransaction: () => void;
}

// Fixed store name (you had useCounterStore — probably typo)
export const useRecordStore = create<INTERFACE_Record_Store>()(
  devtools(
    persist(
      (set) => ({
        Records: ZUSTAND_Initial_Record,

        setTransaction: (data) =>
          set((state) => ({
            Records: {
              ...state.Records,
              ...data,
              STORE_Date_Updated: new Date().toISOString(),
              STORE_Updated_By: "Current User", // or get from auth
            },
          })),

        setField: (field, value) =>
          set((state) => ({
            Records: {
              ...state.Records,
              [field]: value,
              STORE_Date_Updated: new Date().toISOString(),
              STORE_Updated_By: "Current User",
            },
          })),

        resetTransaction: () =>
          set({
            Records: {
              ...ZUSTAND_Initial_Record,
              STORE_Date_Created: new Date().toISOString(),
              STORE_Date_Updated: new Date().toISOString(),
            },
          }),
      }),
      {
        name: "record-storage", // will be saved in localStorage
      }
    ),
    { name: "Record Store" } // visible in Redux DevTools
  )
);
