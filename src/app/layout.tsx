import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const lexendVariable = localFont({
  // essa aqui
  src: "./fonts/Lexend-Variable.ttf",
  variable: "--font-lexend-variable",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "| RM - Redirect |",
  description: "Um aplicativo para que seja possível anotar nossas lembranças!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} className="light" lang="pt-br">
      <body className={` ${lexendVariable.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
