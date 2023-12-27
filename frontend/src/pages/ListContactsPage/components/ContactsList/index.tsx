import { ArrowDown, ArrowUp, NotePencil, TrashSimple } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

import { HStack, VStack } from "../../../../../styled-system/jsx";
import { ContactItem } from "../../hooks/useListContacts";

import * as S from "./styles";

type ContactsListProps = {
  filteredContacts: ContactItem[];
  orderByName: "ASC" | "DESC";
  toggleOrderByName: () => void;
  onOpenDeleteContactModal: (contact: ContactItem) => void;
};
function ContactsList({
  filteredContacts,
  orderByName,
  toggleOrderByName,
  onOpenDeleteContactModal,
}: ContactsListProps) {
  return (
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
                  onClick={() => onOpenDeleteContactModal(contact)}
                >
                  <TrashSimple />
                </button>
              </HStack>
            </HStack>
          </S.ContactCard>
        ))}
      </VStack>
    </>
  );
}

export default ContactsList;
