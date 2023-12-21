import { ContactFields } from "../components/ContactForm";
import formatBrazilianPhone from "../utils/formatPhone";

export default abstract class ContactMapper {
  static toPersistence(domainContact: ContactFields) {
    return {
      id: domainContact.id,
      name: domainContact.name,
      email: domainContact.email,
      phone: domainContact.phone?.replace(/\D/g, ""),
      category_id: domainContact.category,
    };
  }

  static toDomain(persistenceContact: any) {
    return {
      id: persistenceContact.id,
      name: persistenceContact.name,
      email: persistenceContact.email,
      phone: formatBrazilianPhone(persistenceContact.phone),
      category: persistenceContact.category_id,
      categoryName: persistenceContact.category_name,
    };
  }
}
