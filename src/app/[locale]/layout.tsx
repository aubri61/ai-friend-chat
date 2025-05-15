import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "AI Friend Chat",
  description: "Chat with your AI Friend.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}

// export default async function LocaleLayout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: { locale: string }; //고침
// }) {
//   const { locale } = params; // await 제거
//   if (!hasLocale(routing.locales, locale)) {
//     notFound();
//   }

//   return (
//     <html lang={locale}>
//       <body>
//         <NextIntlClientProvider locale={locale}>
//           {children}
//         </NextIntlClientProvider>
//       </body>
//     </html>
//   );
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {

//   return (
//     <html lang="en">
//       <body className={`antialiased`}>{children}</body>
//     </html>
//   );
// }
