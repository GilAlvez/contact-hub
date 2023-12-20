import { ReactNode } from "react";

import { Button } from "../Button";
import ReactPortal from "../ReactPortal";

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

  return (
    <ReactPortal portalId="modal-portal">
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
      </S.Overlay>
    </ReactPortal>
  );
}
