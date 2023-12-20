import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ContactForm, { ContactFields, ContactFormRef } from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import PageLoading from "../../components/PageLoading";
import toast from "../../components/Toast/toast";
import ContactsService from "../../services/ContactsService";

function EditContactPage() {
  const [contactName, setContactName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const contactFormRef = useRef<ContactFormRef | null>(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchContact = useCallback(async () => {
    if (!id) return;

    try {
      const contact = await ContactsService.unique(id);

      contactFormRef.current?.setFieldsValues(contact);
      setIsLoading(false);
      setContactName(contact.name);
    } catch {
      navigate("/");
      toast({
        variant: "danger",
        title: "Contact not found",
      });
    }
  }, [navigate, id]);

  useEffect(() => {
    fetchContact();
  }, [fetchContact]);

  async function onSubmit(data: ContactFields) {
    if (!id) return;

    const contact = {
      name: data.name,
      email: data.email,
      phone: data.phone?.replace(/\D/g, ""),
      category_id: data.category,
    };

    try {
      await ContactsService.update(id, contact);

      setContactName(data.name);
      toast({
        title: "Contact updated successfully!",
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
      <PageLoading active={isLoading} />
      <PageHeader title={contactName ? `Edit ${contactName}` : "Loading..."} />
      <ContactForm ref={contactFormRef} onSubmit={onSubmit} submitLabel="Edit" />
    </>
  );
}

export default EditContactPage;
