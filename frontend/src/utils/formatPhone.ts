export default function formatBrazilianPhone(phoneNumber: string) {
  return phoneNumber
    .replace(/\D/g, "") // Remove all non digits characters
    .replace(/^(\d{2})\B/, "($1) ") // Separate DDD digits
    .replace(/(\d{1})?(\d{4})(\d{4})/, "$1 $2-$3"); // Separate phone format (landline/cellphone)
}
