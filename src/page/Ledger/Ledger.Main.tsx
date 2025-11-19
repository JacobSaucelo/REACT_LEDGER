import CoreTextsHeaderText from "@/Core/Texts/Core.HeaderTexts";
import ProfileForm from "./Form/Form.Main";
import TableTransactionsMain from "./Table/Table.Transactions.Main";
import LedgerContentHeader from "./Content/Ledger.Content.Header";
import { ModeToggle } from "@/components/mode-toggle";

export default function LedgerMain() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-[1400px] m-auto p-2">
      <article className="hidden md:block border p-4 rounded">
        <ModeToggle />
      </article>
      <article className="col-span-2 md:col-span-2 border rounded">
        <LedgerContentHeader />
      </article>

      {/* <ProfileForm />
      <TableTransactionsMain /> */}
    </section>
  );
}
