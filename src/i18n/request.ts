import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { hasLocale } from "next-intl";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  let messages = {};
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (err) {
    console.error(`[i18n/request] Failed to load messages for "${locale}":`, err);
  }

  return {
    locale,
    messages,
  };
});
