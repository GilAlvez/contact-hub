import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { ContactFields } from "../../../components/ContactForm";
import toast from "../../../components/Toast/toast";
import ContactsService from "../../../services/ContactsService";

export type ContactItem = ContactFields & { id: string; categoryName?: string };

export function useListContacts() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [orderByName, setOrderByName] = useState<"ASC" | "DESC">("ASC");
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isDeleteModalVisible, setisDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState<ContactItem | null>(null);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await ContactsService.list(orderByName);
      setHasError(false);
      setContacts(response);
    } catch (e) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderByName]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  function toggleOrderByName() {
    setOrderByName((prevState) => (prevState === "ASC" ? "DESC" : "ASC"));
  }

  function onSearchFieldChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function retry() {
    fetchContacts();
  }

  function onOpenDeleteContactModal(contact: ContactItem) {
    setisDeleteModalVisible(true);
    setContactBeingDeleted(contact);
  }

  async function onConfirmDeleteContact() {
    setIsLoadingDelete(true);
    try {
      await ContactsService.delete(contactBeingDeleted!.id);

      setContacts((prevState) =>
        prevState.filter((contact) => contact.id !== contactBeingDeleted!.id),
      );
      setisDeleteModalVisible(false);
      setContactBeingDeleted(null);

      toast({
        variant: "success",
        title: "Contact deleted successfully",
      });
    } catch {
      toast({
        variant: "danger",
        title: "An error occurred while deleting the contact",
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  function onCancelDeleteContact() {
    setisDeleteModalVisible(false);
  }

  return {
    isLoading,
    isDeleteModalVisible,
    isLoadingDelete,
    contactBeingDeleted,
    contacts,
    hasError,
    filteredContacts,
    orderByName,
    searchTerm,
    retry,
    toggleOrderByName,
    onConfirmDeleteContact,
    onCancelDeleteContact,
    onOpenDeleteContactModal,
    onSearchFieldChange,
  };
}
