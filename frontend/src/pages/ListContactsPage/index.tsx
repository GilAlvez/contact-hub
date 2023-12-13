import { ArrowDown, ArrowUp, NotePencil, TrashSimple } from "@phosphor-icons/react";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { HStack, VStack } from "../../../styled-system/jsx";
import PageLoading from "../../components/PageLoading";
import SearchField from "../../components/SearchField";
import ContactsService from "../../services/ContactsService";

import * as S from "./styles";

function ListContactsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [orderByName, setOrderByName] = useState<"ASC" | "DESC">("ASC");
  const [contacts, setContacts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    setIsLoading(true);

    ContactsService.list(orderByName)
      .then(async (json) => {
        setContacts(json);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [orderByName]);

  function toggleOrderByName() {
    setOrderByName((prevState) => (prevState === "ASC" ? "DESC" : "ASC"));
  }

  function onSearchFieldChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  return (
    <>
      <PageLoading active={isLoading} />
      <SearchField
        placeholder="Search contact..."
        type="search"
        value={searchTerm}
        onChange={onSearchFieldChange}
      />

      <S.Container>
        <HStack justify="space-between">
          <S.PageTitle>
            {filteredContacts.length} {filteredContacts.length === 1 ? "Contact" : "Contacts"}
          </S.PageTitle>
          <S.NewContactLink to="/new">New Contact</S.NewContactLink>
        </HStack>

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
      </S.Container>
    </>
  );
}

export default ListContactsPage;
