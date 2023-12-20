import EventManager from "../../libs/EventManager";

import { ToastProps } from "./ToastContainer";

export const toastEventManager = new EventManager();

export default function toast({ title, variant, duration }: Omit<ToastProps, "id">) {
  toastEventManager.emitTo("addtoast", { title, variant, duration });
}
