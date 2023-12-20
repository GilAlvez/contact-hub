import { ReactNode } from "react";
import ReactDOM from "react-dom";

type ReactPortalProps = {
  portalId?: string;
  children: ReactNode;
};

function ReactPortal({ portalId = "portal", children }: ReactPortalProps) {
  let container = document.getElementById(portalId);

  if (!container) {
    container = document.createElement("div");
    container.setAttribute("id", portalId);
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(children, container);
}

export default ReactPortal;
