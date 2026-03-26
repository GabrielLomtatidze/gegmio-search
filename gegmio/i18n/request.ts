import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = hasLocale(routing.locales, requestLocale)
    ? requestLocale
    : routing.defaultLocale;

  let messages;

  switch (locale) {
    case "ka":
      messages = (await import("./translate/ka.json")).default;
      break;
    case "en":
      messages = (await import("./translate/en.json")).default;
      break;
    default:
      messages = (await import("./translate/ka.json")).default;
  }

  return { locale, messages };
});