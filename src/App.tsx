import { ThemeProvider } from "@/components/theme-provider";
import LedgerMain from "./page/Ledger/Ledger.Main";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <LedgerMain />
    </ThemeProvider>
  );
}

export default App;
