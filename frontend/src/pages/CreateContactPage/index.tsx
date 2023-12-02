import { Button } from "../../components/Button";
import PageHeader from "../../components/PageHeader";
import { Select } from "../../components/Select";
import { TextField } from "../../components/TextField";

function CreateContactPage() {
  return (
    <>
      <PageHeader title="Create Contact" />
      <TextField />
      <Select>
        <option value="123">Instagram</option>
      </Select>
      <Button>Create</Button>
      <Button disabled>Create</Button>
    </>
  );
}

export default CreateContactPage;
