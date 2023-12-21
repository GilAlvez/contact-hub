import {
  ArrowDown,
  ArrowUp,
  NotePencil,
  Package,
  TrashSimple,
  WarningCircle,
} from "@phosphor-icons/react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { HStack, VStack } from "../../../styled-system/jsx";
import { Button } from "../../components/Button";
import { ContactFields } from "../../components/ContactForm";
import Modal from "../../components/Modal";
import PageLoading from "../../components/PageLoading";
import SearchField from "../../components/SearchField";
import toast from "../../components/Toast/toast";
import ContactsService from "../../services/ContactsService";

import * as S from "./styles";

type ContactItem = ContactFields & { id: string; categoryName?: string };

function ListContactsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [orderByName, setOrderByName] = useState<"ASC" | "DESC">("ASC");
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isDeleteModalVisible, setisDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState<ContactItem | null>(null);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  // eslint-disable-next-line no-nested-ternary
  const headerAlignment = !hasError && contacts.length > 0 ? "space-between" : "center";

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await ContactsService.list(orderByName);
      setHasError(false);
      setContacts(response);
    } catch (e) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderByName]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  function toggleOrderByName() {
    setOrderByName((prevState) => (prevState === "ASC" ? "DESC" : "ASC"));
  }

  function onSearchFieldChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function retry() {
    fetchContacts();
  }

  async function onConfirmDeleteContact() {
    setIsLoadingDelete(true);
    try {
      await ContactsService.delete(contactBeingDeleted!.id);

      setContacts((prevState) =>
        prevState.filter((contact) => contact.id !== contactBeingDeleted!.id),
      );
      setisDeleteModalVisible(false);
      setContactBeingDeleted(null);

      toast({
        variant: "success",
        title: "Contact deleted successfully",
      });
    } catch {
      toast({
        variant: "danger",
        title: "An error occurred while deleting the contact",
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return (
    <>
      <PageLoading active={isLoading} />

      <Modal
        danger
        visible={isDeleteModalVisible}
        isLoading={isLoadingDelete}
        title={`Are you sure you want to remove the ${contactBeingDeleted?.name} contact?`}
        confirmLabel="Delete"
        onConfirm={onConfirmDeleteContact}
        onCancel={() => setisDeleteModalVisible(false)}
      >
        This action cannot be undone!
      </Modal>

      {contacts.length > 0 && (
        <SearchField
          placeholder="Search contact..."
          type="search"
          value={searchTerm}
          onChange={onSearchFieldChange}
        />
      )}

      <S.Container>
        <HStack justify={headerAlignment}>
          {!hasError && contacts.length > 0 && (
            <S.PageTitle>
              {filteredContacts.length} {filteredContacts.length === 1 ? "Contact" : "Contacts"}
            </S.PageTitle>
          )}
          <S.NewContactLink to="/new">New Contact</S.NewContactLink>
        </HStack>

        {hasError && (
          <S.ErrorContainer>
            <S.ErrorMessage>An error has occurred</S.ErrorMessage>
            <Button type="button" onClick={retry} height={8} letterSpacing="widest">
              RETRY
            </Button>
          </S.ErrorContainer>
        )}

        {!hasError && (
          <>
            {contacts.length < 1 && !isLoading && (
              <S.EmptyListContainer>
                <Package size={100} weight="thin" />
                <p>
                  Empty contacts, click on &quot;<S.EmptyListCTA>New Contact</S.EmptyListCTA>&quot;{" "}
                  to create your first one
                </p>
              </S.EmptyListContainer>
            )}

            {contacts.length > 0 && filteredContacts.length < 1 && (
              <S.SearchNotFoundContainer>
                <WarningCircle />
                <span>Results not found to &quot;{searchTerm}&quot;</span>
              </S.SearchNotFoundContainer>
            )}

            {filteredContacts.length > 0 && (
              <>
                <S.OrderByNameButton onClick={toggleOrderByName}>
                  Nome
                  {orderByName === "ASC" ? <ArrowDown size={18} /> : <ArrowUp size={18} />}
                </S.OrderByNameButton>

                <VStack gap={4}>
                  {filteredContacts.map((contact) => (
                    <S.ContactCard key={contact.id}>
                      <HStack justify="space-between">
                        <VStack gap={1} alignItems="start">
                          <HStack gap={2}>
                            <S.ContactName>{contact.name}</S.ContactName>
                            {contact.categoryName && (
                              <S.ContactCategory>{contact.categoryName}</S.ContactCategory>
                            )}
                          </HStack>

                          <S.ContactValue>{contact.email}</S.ContactValue>
                          <S.ContactValue>{contact.phone}</S.ContactValue>
                        </VStack>

                        <HStack>
                          <Link to={`/edit/${contact.id}`} aria-label="Editar Contato">
                            <NotePencil />
                          </Link>

                          <button
                            type="button"
                            aria-label="Deletar Contato"
                            onClick={() => {
                              setisDeleteModalVisible(true);
                              setContactBeingDeleted(contact);
                            }}
                          >
                            <TrashSimple />
                          </button>
                        </HStack>
                      </HStack>
                    </S.ContactCard>
                  ))}
                </VStack>
              </>
            )}
          </>
        )}
      </S.Container>
    </>
  );
}

export default ListContactsPage;
