import { eq } from "drizzle-orm";
import db from "../database.ts";
import urlsTable from "../models/url.model.ts";

export const updateClickCount = async (clickCount: number, urlId: string) => {
  clickCount++;
  await db.update(urlsTable).set({ clickCount }).where(eq(urlsTable.id, urlId));
};
