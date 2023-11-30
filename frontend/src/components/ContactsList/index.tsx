import { HStack } from "../../../styled-system/jsx";

import * as S from "./styles";

function ContactsList() {
  return (
    <S.Container>
      <HStack justify="space-between">
        <S.PageTitle>0 Contacts</S.PageTitle>
        <S.Link href="/">New Contact</S.Link>
      </HStack>
    </S.Container>
  );
}

export default ContactsList;
