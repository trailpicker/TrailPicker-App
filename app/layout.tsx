import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { preferencesFromRow } from "@/lib/user-preferences";
import { DisplayPreferencesProvider } from "@/components/settings/DisplayPreferencesProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TrailPicker",
  description:
    "Build and compare backpacking gear with live weight and cost calculations.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = session?.user?.email
    ? await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { settings: true },
      })
    : null;
  const { weightUnit, distanceUnit, temperatureUnit } = preferencesFromRow(user?.settings);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <DisplayPreferencesProvider preferences={{ weightUnit, distanceUnit, temperatureUnit }}>
          <Navbar />
          <main className="flex-1">{children}</main>
        </DisplayPreferencesProvider>
      </body>
    </html>
  );
}
