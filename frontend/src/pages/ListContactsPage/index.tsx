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

  return (
    <>
      <PageLoading active={isLoading} />

      {contacts.length > 0 && (
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

        {!hasError && (
          <>
            {contacts.length < 1 && !isLoading && <EmptyList />}

            {contacts.length > 0 && filteredContacts.length < 1 && (
              <SearchNotFound searchTerm={searchTerm} />
            )}

            {filteredContacts.length > 0 && (
              <ContactsList
                filteredContacts={filteredContacts}
                orderByName={orderByName}
                onOpenDeleteContactModal={onOpenDeleteContactModal}
                toggleOrderByName={toggleOrderByName}
              />
            )}
          </>
        )}
      </S.Container>

      <Modal
        danger
        visible={isDeleteModalVisible}
        isLoading={isLoadingDelete}
        title={`Are you sure you want to remove the ${contactBeingDeleted?.name} contact?`}
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
