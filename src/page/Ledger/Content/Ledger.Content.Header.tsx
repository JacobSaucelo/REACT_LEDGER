import CoreTextsHeaderText from "@/Core/Texts/Core.HeaderTexts";
import { BookA, Landmark } from "lucide-react";
import React from "react";

export default function LedgerContentHeader() {
  return (
    <header className="bg-gray-100  border-black dark:bg-gray-900 dark:border-white border-4 flex items-center p-2 gap-2 select-none">
      <aside className="flex items-center gap-2 bg-yellow-400 text-black p-2">
        {/* <BookA size={35} /> */}
        <Landmark size={35} />
        <h1 className="scroll-m-20 text-4xl font-extrabold text-balance">
          LEDGR
        </h1>
      </aside>
      <aside>
        <h1 className="hidden md:block scroll-m-20 text-4xl font-extrabold text-balance">
          BUSINESS RECORDS
        </h1>
        <h1 className="block md:hidden scroll-m-20 text-4xl font-extrabold text-balance">
          RECORDS
        </h1>
      </aside>
    </header>
  );
}
