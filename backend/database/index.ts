import { Client } from "pg";

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "root",
  password: "root",
  database: "contacthub",
});

client.connect();

client.query("");

export default async function query<T = unknown>(
  instruction: string,
): Promise<T[]> {
  const { rows } = await client.query(instruction);

  return rows;
}
