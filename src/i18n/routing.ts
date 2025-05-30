import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "kr"],

  // Used when no locale matches
  defaultLocale: "kr",
});

export type Locale = (typeof routing.locales)[number];
