import { pgTable, varchar, uuid, timestamp, text } from "drizzle-orm/pg-core";

const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 90 }).notNull(),
  email: varchar("email", { length: 150 }).unique().notNull(),
  hashPassword: text("hash_Password").notNull(),
  createdAt: timestamp("created_At").defaultNow().notNull(),
});

export default usersTable;
