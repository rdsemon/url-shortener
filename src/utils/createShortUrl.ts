import { customAlphabet } from "nanoid";

const generateShortUrl = (url: string) => {
  const nanoid = customAlphabet(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    7,
  );
  if (url) {
    const shortCode = nanoid();
    const shortUrl = `http://localhost:${process.env.PORT}/api/v1/${shortCode}`;

    return {
      originalUrl: url,
      shortCode,
      shortUrl,
    };
  }
};

export default generateShortUrl;
