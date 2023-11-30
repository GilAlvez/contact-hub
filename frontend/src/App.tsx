import ContactsList from "./components/ContactsList";
import PageLayout from "./components/PageLayout";
import SearchField from "./components/SearchField";

function App() {
  return (
    <PageLayout>
      <SearchField placeholder="Search contact..." />
      <ContactsList />
    </PageLayout>
  );
}

export default App;
