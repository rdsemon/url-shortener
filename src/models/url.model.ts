import {
  integer,
  pgTable,
  varchar,
  uuid,
  timestamp,
  text,
} from "drizzle-orm/pg-core";

const urlsTable = pgTable("url", {
  id: uuid("id").defaultRandom().primaryKey(),
  originalUrl: text("original_Url").notNull(),
  shortCode: varchar("short_code", { length: 10 }).notNull().unique(),
  shortUrl: varchar("short_Url", { length: 150 }).notNull().unique(),
  createdAt: timestamp("created_At").defaultNow().notNull(),
  clickCount: integer("click_Count").default(0).notNull(),
});

export default urlsTable;
