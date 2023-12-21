import { useRef } from "react";

import { ContactFields, ContactFormRef } from "../../components/ContactForm";
import toast from "../../components/Toast/toast";
import ContactsService from "../../services/ContactsService";

export function useCreateContact() {
  const contactFormRef = useRef<ContactFormRef>(null);

  async function onSubmit(contact: ContactFields) {
    try {
      await ContactsService.create(contact);

      contactFormRef.current?.resetForm();

      toast({
        title: "Contact registered successfully!",
        variant: "success",
      });
    } catch {
      toast({
        title: "An error has occurred!",
        variant: "danger",
      });
    }
  }

  return { contactFormRef, onSubmit };
}
