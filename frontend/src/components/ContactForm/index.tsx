import { Button } from "../Button";
import FormGroup from "../FormGroup";
import { Select } from "../Select";
import { TextField } from "../TextField";

import * as S from "./styles";

export type ContactFormProps = {
  submitLabel: string;
};

export default function ContactForm({ submitLabel }: ContactFormProps) {
  return (
    <S.Form>
      <FormGroup error="O formato está incorreto">
        <TextField placeholder="Name" danger />
      </FormGroup>

      <FormGroup>
        <TextField placeholder="Email" />
      </FormGroup>

      <FormGroup>
        <TextField placeholder="Phone" />
      </FormGroup>

      <FormGroup>
        <Select>
          <option value="Instagram">Instagram</option>
        </Select>
      </FormGroup>

      <S.ButtonContainer>
        <Button type="submit">{submitLabel}</Button>
      </S.ButtonContainer>
    </S.Form>
  );
}
