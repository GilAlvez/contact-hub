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
import PageLoading from "../../components/PageLoading";
import SearchField from "../../components/SearchField";
import ContactsService from "../../services/ContactsService";

import * as S from "./styles";

function ListContactsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [orderByName, setOrderByName] = useState<"ASC" | "DESC">("ASC");
  const [contacts, setContacts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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

  return (
    <>
      <PageLoading active={isLoading} />

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
                            {contact.category_name && (
                              <S.ContactCategory>{contact.category_name}</S.ContactCategory>
                            )}
                          </HStack>

                          <S.ContactValue>{contact.email}</S.ContactValue>
                          <S.ContactValue>{contact.phone}</S.ContactValue>
                        </VStack>

                        <HStack>
                          <Link to={`/edit/${contact.id}`} aria-label="Editar Contato">
                            <NotePencil />
                          </Link>

                          <button type="button" aria-label="Deletar Contato">
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
