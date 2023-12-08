import { ArrowUp, NotePencil, TrashSimple } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

import { HStack, VStack } from "../../../styled-system/jsx";
import Modal from "../../components/Modal";
import SearchField from "../../components/SearchField";

import * as S from "./styles";

function ListContactsPage() {
  return (
    <>
      <Modal danger />
      <SearchField placeholder="Search contact..." />

      <S.Container>
        <HStack justify="space-between">
          <S.PageTitle>0 Contacts</S.PageTitle>
          <S.NewContactLink to="/new">New Contact</S.NewContactLink>
        </HStack>

        <S.OrderByNameButton>
          Nome
          <ArrowUp size={18} />
        </S.OrderByNameButton>

        <VStack gap={4}>
          <S.ContactCard>
            <HStack justify="space-between">
              <VStack gap={1} alignItems="start">
                <HStack gap={2}>
                  <S.ContactName>Gildson Alves</S.ContactName>
                  <S.ContactCategory>Category</S.ContactCategory>
                </HStack>

                <S.ContactValue>email</S.ContactValue>
                <S.ContactValue>number</S.ContactValue>
              </VStack>

              <HStack>
                <Link to="/edit/{id}" aria-label="Editar Contato">
                  <NotePencil />
                </Link>

                <button type="button" aria-label="Deletar Contato">
                  <TrashSimple />
                </button>
              </HStack>
            </HStack>
          </S.ContactCard>
        </VStack>
      </S.Container>
    </>
  );
}

export default ListContactsPage;
