import { Client } from "pg";

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "root",
  database: "contacthub",
});

client.connect();

async function query<T = unknown>(
  strings: TemplateStringsArray,
  ...values: any[]
): Promise<T[]> {
  let text = "";

  // Converts each value to dollar assign and value index
  // e.g. Template string `VALUES(${name}, ${email})` >>>> To string "VALUES($1, $2)"
  // Ignores objects as values, putting raw values directly
  for (let index = 0; index < strings.length; index += 1) {
    text += strings[index];
    if (index < values.length) {
      if (typeof values[index] === "object" && values[index].raw) {
        text += values[index].raw;
      } else {
        text += `$${index + 1}`;
      }
    }
  }

  const filteredValues = values.filter(
    (value) => !(typeof value === "object" && value.raw),
  );

  const { rows } = await client.query(text, filteredValues);

  return rows;
}

export default {
  client,
  query,
};
