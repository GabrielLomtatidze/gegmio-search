import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: {
    default: "Gegmio | დაჯავშნა და ჭამა მარტივად",
    template: "%s | Gegmio",
  },
  description:
    "Gegmio არის პლატფორმა სადაც შეგიძლიათ მარტივად მოძებნოთ რესტორნები, ბარბერები, სერვისები, დაჯავშნოთ და დაგეგმოთ.",

  keywords: [
    "დაჯავშნა",
    "ჭამა",
    "რესტორნები",
    "მაგიდის დაჯავშნა",
    "restaurant booking Georgia",
    "eat in Georgia",
    "reserve table",
    "Gegmio",
  ],

  authors: [{ name: "Gegmio Team" }],
  creator: "Gegmio",

  openGraph: {
    title: "Gegmio | დაჯავშნე და ისიამოვნე ჭამით",
    description:
      "იპოვე საუკეთესო რესტორნები და დაჯავშნე მაგიდა მარტივად. Gegmio — შენი ჭამის პარტნიორი.",
    url: "https://gegmio.com",
    siteName: "Gegmio",
    locale: "ka_GE",
    type: "website",
    images: [
      {
        url: "/images/logo.svg",
        width: 1200,
        height: 630,
        alt: "Gegmio Booking Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Gegmio | დაჯავშნა და ჭამა",
    description:
      "დაჯავშნე რესტორანი სწრაფად და მარტივად საქართველოში.",
    images: ["/images/logo.svg"],
  },

  icons: {
    icon: "/images/logo.svg",
    shortcut: "/images/logo.svg",
  },

  metadataBase: new URL("https://gegmio.com"),
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider locale={locale}>
            {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}