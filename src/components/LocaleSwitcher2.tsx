"use client";

import { usePathname, useRouter } from "next/navigation";
import { routing, Locale } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as Locale;

    if (!pathname) return;

    const segments = pathname.split("/");

    if (segments.length < 2) return;
    if (!routing.locales.includes(newLocale)) return;

    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <select onChange={handleChange} defaultValue={routing.defaultLocale}>
      {routing.locales.map((loc) => (
        <option key={loc} value={loc}>
          {loc.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
