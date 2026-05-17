import { eq } from "drizzle-orm";
import db from "../../database.js";
import urlsTable from "../../models/url.model.js";
import AppError from "../../utils/appError.js";

interface urlDataType {
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
}
export const createUrlService = async (urlData: urlDataType) => {
  const [url] = await db
    .insert(urlsTable)
    .values(urlData)
    .returning({ shortUrl: urlsTable.shortUrl });

  if (!url) throw new AppError("Url creation fail", 400);

  return url;
};

export const getUrlByCodeService = async (shortCode: string) => {
  const [url] = await db
    .select({
      originalUrl: urlsTable.originalUrl,
      clickCount: urlsTable.clickCount,
      id: urlsTable.id,
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, shortCode));

  if (!url) {
    throw new AppError("Url not found", 404);
  }

  return url;
};
