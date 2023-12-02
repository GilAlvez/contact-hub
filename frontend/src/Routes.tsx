import { Route, Switch } from "react-router-dom";

import CreateContactPage from "./pages/CreateContactPage";
import EditContactPage from "./pages/EditContactPage";
import ListContactsPage from "./pages/ListContactsPage";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" component={ListContactsPage} exact />
      <Route path="/new" component={CreateContactPage} />
      <Route path="/edit/:id" component={EditContactPage} />
    </Switch>
  );
}
