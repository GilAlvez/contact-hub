import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";

function CreateContactPage() {
  return (
    <>
      <PageHeader title="Create Contact" />
      <ContactForm submitLabel="Create" />
      {/* <TextField />
      <Select>
        <option value="123">Instagram</option>
      </Select>
      <Button>Create</Button>
      <Button disabled>Create</Button> */}
    </>
  );
}

export default CreateContactPage;
