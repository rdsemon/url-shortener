import asyncHandler from "../utils/catchAsyncErrorHandler.js";
import generateShortUrl from "../utils/createShortUrl.js";
import AppError from "../utils/appError.js";
import { updateClickCount } from "../services/db.services.js";
import {
  createUrlService,
  getUrlByCodeService,
} from "../service/dbService/urlDb.service.js";

const createShortUrl = asyncHandler(async (req, res, next) => {
  const { originalUrl } = req.body;

  if (originalUrl.length < 50)
    return next(new AppError("Url is alreay short", 400));

  const urlData = generateShortUrl(originalUrl);

  if (!urlData) return next(new AppError("url data genarating fail", 400));

  const url = await createUrlService(urlData);

  res.status(201).json({ status: "successful", shortUrl: url.shortUrl });
});

const getUrlByCode = asyncHandler(async (req, res, next) => {
  const shortCode = req.params.shortCode as string;

  if (!shortCode) return next(new AppError("code not found", 400));

  const url = await getUrlByCodeService(shortCode);

  const { clickCount, id } = url;
  //update the clickCount
  await updateClickCount(clickCount, id);

  res.redirect(url.originalUrl);
});
export { createShortUrl, getUrlByCode };
