import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

const siteName = "Lista de Espera";
const siteDescription = "Entre na lista de espera do Trilho Académico.";

export const metadata: Metadata = {
  title: siteName,
  description: siteDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white from-[#fff6df]  to-[#FEFBF0]`}>
        <main className="flex justify-center items-center min-h-screen">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
