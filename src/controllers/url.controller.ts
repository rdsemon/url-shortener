import asyncHandler from "../utils/catchAsyncErrorHandler.js";
import generateShortUrl from "../utils/createShortUrl.js";
import urlsTable from "../models/url.model.js";
import AppError from "../utils/appError.js";
import db from "../database.js";
import { updateClickCount } from "../services/db.services.js";
import { eq } from "drizzle-orm";

const createShortUrl = asyncHandler(async (req, res, next) => {
  const { originalUrl } = req.body;

  if (originalUrl.length < 50)
    return next(new AppError("Url is alreay short", 400));

  const urlData = generateShortUrl(originalUrl);

  if (!urlData) return next(new AppError("url data genarating fail", 400));

  const [url] = await db
    .insert(urlsTable)
    .values(urlData)
    .returning({ shortUrl: urlsTable.shortUrl });

  if (!url) return next(new AppError("Url creation fail", 400));

  res.status(201).json({ status: "successful", id: url.shortUrl });
});

const getUrlByCode = asyncHandler(async (req, res, next) => {
  const shortCode = req.params.shortCode as string;

  if (!shortCode) return next(new AppError("code not found", 400));

  // get the url from database
  const [url] = await db
    .select({
      originalUrl: urlsTable.originalUrl,
      clickCount: urlsTable.clickCount,
      id: urlsTable.id,
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, shortCode));

  if (!url) {
    return res.status(404).json({ message: "URL not found" });
  }

  const { clickCount, id } = url;
  //update the clickCount
  await updateClickCount(clickCount, id);

  res.redirect(url.originalUrl);
});
export { createShortUrl, getUrlByCode };
