import { ForwardedRef, forwardRef } from "react";

import { Button } from "../Button";
import FormGroup from "../FormGroup";
import { Select } from "../Select";
import { TextField } from "../TextField";

import { useContactForm } from "./hooks/useContactForm";
import * as S from "./styles";

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
  submitLabel: string;
  onSubmit: (data: ContactFields) => Promise<void>;
};

const ContactForm = forwardRef(
  ({ submitLabel, onSubmit }: ContactFormProps, ref: ForwardedRef<ContactFormRef>) => {
    const {
      data,
      errors,
      isLoading,
      onFormSubmit,
      handleFieldsChange,
      categories,
      isLoadingCategories,
    } = useContactForm({ ref, onSubmit });

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
