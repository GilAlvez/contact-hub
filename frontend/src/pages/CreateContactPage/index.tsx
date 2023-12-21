import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";

import { useCreateContact } from "./useCreateContact";

function CreateContactPage() {
  const { contactFormRef, onSubmit } = useCreateContact();

  return (
    <>
      <PageHeader title="Create Contact" />
      <ContactForm ref={contactFormRef} submitLabel="Create" onSubmit={onSubmit} />
    </>
  );
}

export default CreateContactPage;
