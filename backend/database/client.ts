import { Client } from "pg";

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "root",
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
  for (let index = 0; index < strings.length; index += 1) {
    text += strings[index];
    if (index < values.length) {
      text += `$${index + 1}`;
    }
  }

  const { rows } = await client.query(text, values);

  return rows;
}

export default {
  client,
  query,
};
