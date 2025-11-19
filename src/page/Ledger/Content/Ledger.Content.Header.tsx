import { Landmark } from "lucide-react";

export default function LedgerContentHeader() {
  return (
    <header className="bg-gray-100 border-black dark:bg-black dark:border-white border-4 flex items-center p-2 gap-2 select-none">
      <aside className="flex items-center gap-2 text-white bg-black dark:bg-yellow-400 dark:text-black p-2">
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
