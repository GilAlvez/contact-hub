import { ReactNode } from "react";
import ReactDOM from "react-dom";

import { Button } from "../Button";

import * as S from "./styles";

type ModalProps = {
  title: string;
  visible: boolean;
  danger?: boolean;
  confirmLabel?: string;
  children?: ReactNode;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function Modal({
  title,
  visible,
  confirmLabel,
  children,
  danger = false,
  isLoading = false,
  onConfirm,
  onCancel,
}: ModalProps) {
  if (!visible) return null;

  const element = document.getElementById("modal-portal");

  if (!element) {
    throw new Error("Modal Portal element NOT FOUND");
  }

  return ReactDOM.createPortal(
    <S.Overlay>
      <S.Box>
        <S.Title danger={danger}>{title}</S.Title>

        <S.Body>{children}</S.Body>

        <S.Footer>
          <S.CancelButton type="button" disabled={isLoading} onClick={onCancel}>
            Cancel
          </S.CancelButton>
          <Button danger={danger} disabled={isLoading} type="button" onClick={onConfirm}>
            {confirmLabel ?? "OK"}
          </Button>
        </S.Footer>
      </S.Box>
    </S.Overlay>,
    element,
  );
}
