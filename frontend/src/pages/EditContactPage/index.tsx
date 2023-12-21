import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import PageLoading from "../../components/PageLoading";

import { useEditContact } from "./useEditContact";

function EditContactPage() {
  const { isLoading, contactName, contactFormRef, onSubmit } = useEditContact();

  return (
    <>
      <PageLoading active={isLoading} />
      <PageHeader title={contactName ? `Edit ${contactName}` : "Loading..."} />
      <ContactForm ref={contactFormRef} onSubmit={onSubmit} submitLabel="Edit" />
    </>
  );
}

export default EditContactPage;
