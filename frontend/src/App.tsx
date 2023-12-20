import { IconContext, IconProps } from "@phosphor-icons/react";
import { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import PageLayout from "./components/PageLayout";
import ToastContainer from "./components/Toast/ToastContainer";
import AppRoutes from "./Routes";

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
    <BrowserRouter>
      <IconContext.Provider value={iconValue}>
        <ToastContainer />
        <PageLayout>
          <Header />
          <AppRoutes />
        </PageLayout>
      </IconContext.Provider>
    </BrowserRouter>
  );
}

export default App;
