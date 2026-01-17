import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  // Ahora la ruta empieza con src/
  schema: "src/prisma/schema", 
  migrations: {
    path: "src/prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});