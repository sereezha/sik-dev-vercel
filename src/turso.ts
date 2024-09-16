import { createClient } from "@libsql/client/web";

export const dbClient = createClient({
  url: import.meta.env.TURSO_DATABASE_URL!,
  authToken: import.meta.env.TURSO_AUTH_TOKEN,
});
