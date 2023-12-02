import { IconContext, IconProps } from "@phosphor-icons/react";
import { useMemo } from "react";

import ContactsList from "./components/ContactsList";
import PageLayout from "./components/PageLayout";
import SearchField from "./components/SearchField";

function App() {
  const iconValue = useMemo(
    () =>
      ({
        color: "#111827",
        size: 24,
        weight: "bold",
      }) as IconProps,
    [],
  );

  return (
    <IconContext.Provider value={iconValue}>
      <PageLayout>
        <SearchField placeholder="Search contact..." />
        <ContactsList />
      </PageLayout>
    </IconContext.Provider>
  );
}

export default App;
