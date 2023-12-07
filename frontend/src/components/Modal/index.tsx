import { Button } from "../Button";

import * as S from "./styles";

export default function Modal() {
  return (
    <S.Overlay>
      <S.Box>
        <S.Title>
          Are you sure you want to remove the &quot;John Doe&quot; contact?
        </S.Title>
        <S.Body>Modal Body</S.Body>
        <S.Footer>
          <S.CancelButton type="button">Cancel</S.CancelButton>
          <Button type="button">Delete</Button>
        </S.Footer>
      </S.Box>
    </S.Overlay>
  );
}
