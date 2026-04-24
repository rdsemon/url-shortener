import { testApi } from "../utils/apiTester.ts";
import AppError from "../utils/appError.ts";
import asyncHandler from "../utils/catchAsyncErrorHandler.ts";

const createShortUrl = asyncHandler(async (req, res, next) => {
  const { originalUrl } = req.body;

  if (originalUrl.length < 50)
    return next(new AppError("Url is alreay short", 400));

  console.log(originalUrl.length);

  testApi(res);
});

const getUrl = asyncHandler(async (req, res, next) => {
  testApi(res);
});
export { createShortUrl, getUrl };
