import { useRef } from "react";

import ContactForm, { ContactFields, ContactFormRef } from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import toast from "../../components/Toast/toast";
import ContactsService from "../../services/ContactsService";

function CreateContactPage() {
  const contactFormRef = useRef<ContactFormRef>(null);

  async function onSubmit(data: ContactFields) {
    const contact = {
      name: data.name,
      email: data.email,
      phone: data.phone?.replace(/\D/g, ""),
      category_id: data.category,
    };

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

  return (
    <>
      <PageHeader title="Create Contact" />
      <ContactForm ref={contactFormRef} submitLabel="Create" onSubmit={onSubmit} />
    </>
  );
}

export default CreateContactPage;
