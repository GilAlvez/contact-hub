import {
  ChangeEvent,
  FormEvent,
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import useFormValidation from "../../hooks/useFormValidation";
import CategoriesService from "../../services/CategoriesService";
import formatBrazilianPhone from "../../utils/formatPhone";
import isEmailValid from "../../utils/validateEmail";
import { Button } from "../Button";
import FormGroup from "../FormGroup";
import { Select } from "../Select";
import { TextField } from "../TextField";

import * as S from "./styles";

export type ContactFields = {
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
  submitLabel: string;
  onSubmit: (data: ContactFields) => Promise<void>;
};

const ContactForm = forwardRef(
  ({ submitLabel, onSubmit }: ContactFormProps, ref: ForwardedRef<ContactFormRef>) => {
    const defaultValues = { name: "" };

    const [data, setData] = useState<ContactFields>(defaultValues);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);
    const { errors, validate, resetErrors } = useFormValidation<ContactFields>();

    console.log(ref);

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
            phone: formatBrazilianPhone(contact.phone ?? ""),
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

    return (
      <S.Form onSubmit={onFormSubmit} noValidate>
        <FormGroup errors={errors?.name}>
          <TextField
            name="name"
            placeholder="Name *"
            type="text"
            value={data.name}
            onChange={handleFieldsChange}
            disabled={isLoading}
            error={!!errors?.name}
          />
        </FormGroup>

        <FormGroup errors={errors?.email}>
          <TextField
            name="email"
            placeholder="Email"
            type="email"
            value={data.email}
            onChange={handleFieldsChange}
            disabled={isLoading}
            error={!!errors?.email}
          />
        </FormGroup>

        <FormGroup errors={errors?.phone}>
          <TextField
            name="phone"
            placeholder="Phone"
            type="tel"
            value={data.phone}
            onChange={handleFieldsChange}
            disabled={isLoading}
            error={!!errors?.phone}
            maxLength={16}
          />
        </FormGroup>

        <FormGroup errors={errors?.category} isLoading={isLoadingCategories}>
          <Select
            name="category"
            value={data.category}
            onChange={handleFieldsChange}
            disabled={isLoadingCategories || isLoading}
            error={!!errors?.category}
          >
            <option value="">Choose one category...</option>
            {categories?.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormGroup>

        <S.ButtonContainer>
          <Button aria-disabled={isLoading} disabled={isLoading} type="submit">
            {submitLabel}
          </Button>
        </S.ButtonContainer>
      </S.Form>
    );
  },
);

export default ContactForm;
