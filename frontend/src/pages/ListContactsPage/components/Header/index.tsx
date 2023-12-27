import { HStack } from "../../../../../styled-system/jsx";

import * as S from "./styles";

type HeaderProps = {
  hasError: boolean;
  contactsQuantity: number;
  filteredContactsQuantity: number;
};

export default function Header({
  hasError,
  contactsQuantity,
  filteredContactsQuantity,
}: HeaderProps) {
  // eslint-disable-next-line no-nested-ternary
  const headerAlignment = !hasError && contactsQuantity > 0 ? "space-between" : "center";
  return (
    <HStack justify={headerAlignment}>
      {!hasError && contactsQuantity > 0 && (
        <S.PageTitle>
          {filteredContactsQuantity} {filteredContactsQuantity === 1 ? "Contact" : "Contacts"}
        </S.PageTitle>
      )}
      <S.NewContactLink to="/new">New Contact</S.NewContactLink>
    </HStack>
  );
}
