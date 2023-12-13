import { ChangeEvent, FormEvent, useState } from "react";

import useFormValidation from "../../hooks/useFormValidation";
import formatBrazilianPhone from "../../utils/formatPhone";
import isEmailValid from "../../utils/validateEmail";
import { Button } from "../Button";
import FormGroup from "../FormGroup";
import { Select } from "../Select";
import { TextField } from "../TextField";

import * as S from "./styles";

export type ContactFormProps = {
  submitLabel: string;
};

type CreateContactFields = {
  name: string;
  email?: string;
  phone?: string;
  category?: string;
};

export default function ContactForm({ submitLabel }: ContactFormProps) {
  const [data, setData] = useState<CreateContactFields>({ name: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { errors, validate, resetErrors } = useFormValidation<CreateContactFields>();

  function handleFieldsChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const fieldName = e.currentTarget.name;
    let fieldValue = e.currentTarget.value;

    if (fieldName === "phone") {
      fieldValue = formatBrazilianPhone(fieldValue);
    }

    setData({ ...data, [fieldName]: fieldValue });
  }

  function onFormSubmit(e: FormEvent) {
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
      console.log(data);
    } finally {
      setIsLoading(false);
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
          error={!!errors?.phone}
          maxLength={16}
        />
      </FormGroup>

      <FormGroup errors={errors?.category}>
        <Select
          name="category"
          value={data.category}
          onChange={handleFieldsChange}
          error={!!errors?.category}
        >
          <option value="">Choose one category...</option>
          <option value="Instagram">Instagram</option>
        </Select>
      </FormGroup>

      <S.ButtonContainer>
        <Button aria-disabled={isLoading} disabled={isLoading} type="submit">
          {submitLabel}
        </Button>
      </S.ButtonContainer>
    </S.Form>
  );
}
