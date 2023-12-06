import { Route, Routes } from "react-router-dom";

import CreateContactPage from "./pages/CreateContactPage";
import EditContactPage from "./pages/EditContactPage";
import ListContactsPage from "./pages/ListContactsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ListContactsPage />} />
      <Route path="/new" element={<CreateContactPage />} />
      <Route path="/edit/:id" element={<EditContactPage />} />
    </Routes>
  );
}
