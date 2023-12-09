import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";

function EditContactPage() {
  return (
    <>
      <PageHeader title="Edit Contact" />
      <ContactForm submitLabel="Edit" />
    </>
  );
}

export default EditContactPage;
