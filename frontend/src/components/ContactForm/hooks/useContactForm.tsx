import {
  ChangeEvent,
  FormEvent,
  ForwardedRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import useFormValidation from "../../../hooks/useFormValidation";
import CategoriesService from "../../../services/CategoriesService";
import formatBrazilianPhone from "../../../utils/formatPhone";
import isEmailValid from "../../../utils/validateEmail";

export type ContactFields = {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  category?: string;
};

export type ContactFormRef = {
  setFieldsValues: (contact: ContactFields) => void;
  resetForm: () => void;
};

export type ContactFormProps = {
  ref: ForwardedRef<ContactFormRef>;
  onSubmit: (data: ContactFields) => Promise<void>;
};

export const useContactForm = ({ ref, onSubmit }: ContactFormProps) => {
  const defaultValues = { name: "" };

  const [data, setData] = useState<ContactFields>(defaultValues);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);
  const { errors, validate, resetErrors } = useFormValidation<ContactFields>();

  const fetchContacts = useCallback(async () => {
    setIsLoadingCategories(true);
    try {
      const response = await CategoriesService.list();
      setCategories(response);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadingCategories(false);
    }
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      setFieldsValues: (contact: ContactFields) => {
        setData({
          name: contact.name,
          category: contact.category ?? "",
          email: contact.email ?? "",
          phone: contact.phone ?? "",
        });
      },
      resetForm: () => {
        setData(defaultValues);
      },
    }),
    [],
  );

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  function handleFieldsChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const fieldName = e.currentTarget.name;
    let fieldValue = e.currentTarget.value;

    if (fieldName === "phone") {
      fieldValue = formatBrazilianPhone(fieldValue);
    }

    setData({ ...data, [fieldName]: fieldValue });
  }

  async function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    resetErrors();

    // prettier-ignore
    const hasErrors = validate(data, {
      name: [
        (name) => (!name ? "Name is required" : undefined)
      ],
      email: [
        (email) => email && !isEmailValid(email) ? "Email is invalid" : undefined,
      ],
    });

    try {
      if (hasErrors) {
        console.table(errors);
        return;
      }
      await onSubmit(data);
    } finally {
      setIsLoading(false);
      setData(defaultValues);
    }
  }

  return {
    data,
    errors,
    isLoading,
    onFormSubmit,
    handleFieldsChange,
    categories,
    isLoadingCategories,
  };
};
