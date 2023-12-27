import Modal from "../../components/Modal";
import PageLoading from "../../components/PageLoading";

import ContactsList from "./components/ContactsList";
import EmptyList from "./components/EmptyList";
import ErrorStatus from "./components/ErrorStatus";
import Header from "./components/Header";
import SearchField from "./components/SearchField";
import SearchNotFound from "./components/SearchNotFound";
import { useListContacts } from "./hooks/useListContacts";
import * as S from "./styles";

function ListContactsPage() {
  const {
    isLoading,
    orderByName,
    searchTerm,
    contacts,
    filteredContacts,
    isLoadingDelete,
    isDeleteModalVisible,
    contactBeingDeleted,
    hasError,
    retry,
    toggleOrderByName,
    onConfirmDeleteContact,
    onCancelDeleteContact,
    onOpenDeleteContactModal,
    onSearchFieldChange,
  } = useListContacts();

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && !isLoading && !hasContacts;
  const isSearchResultEmpty = !hasError && hasContacts && filteredContacts.length < 1;

  return (
    <>
      <PageLoading visible={isLoading} />

      {hasContacts && (
        <SearchField
          placeholder="Search contact..."
          value={searchTerm}
          onChange={onSearchFieldChange}
        />
      )}

      <S.Container>
        <Header
          hasError={hasError}
          contactsQuantity={contacts.length}
          filteredContactsQuantity={filteredContacts.length}
        />

        {hasError && <ErrorStatus onRetry={retry} />}
        {isSearchResultEmpty && <SearchNotFound searchTerm={searchTerm} />}
        {isListEmpty && <EmptyList />}

        {hasContacts && (
          <ContactsList
            filteredContacts={filteredContacts}
            orderByName={orderByName}
            onOpenDeleteContactModal={onOpenDeleteContactModal}
            toggleOrderByName={toggleOrderByName}
          />
        )}
      </S.Container>

      <Modal
        danger
        visible={isDeleteModalVisible}
        isLoading={isLoadingDelete}
        title={`Are you sure you want to remove the "${contactBeingDeleted?.name}" contact?`}
        confirmLabel="Delete"
        onConfirm={onConfirmDeleteContact}
        onCancel={onCancelDeleteContact}
      >
        This action cannot be undone!
      </Modal>
    </>
  );
}

export default ListContactsPage;
