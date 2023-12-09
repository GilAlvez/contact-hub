import ReactDOM from "react-dom";

import { Button } from "../Button";

import * as S from "./styles";

type ModalProps = {
  danger?: boolean;
};

export default function Modal({ danger = false }: ModalProps) {
  const element = document.getElementById("modal-portal");

  if (!element) {
    throw new Error("Modal Portal element NOT FOUND");
  }

  return ReactDOM.createPortal(
    <S.Overlay>
      <S.Box>
        <S.Title danger={danger}>
          Are you sure you want to remove the &quot;John Doe&quot; contact?
        </S.Title>

        <S.Body>Modal Body</S.Body>

        <S.Footer>
          <S.CancelButton type="button">Cancel</S.CancelButton>
          <Button danger={danger} type="button">
            Delete
          </Button>
        </S.Footer>
      </S.Box>
    </S.Overlay>,
    element,
  );
}
