import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/widgets/Footer/Footer";
import { ToastContainer } from "react-toastify";


const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vizier Airways",
  description:
    "Book flights with Vizier Airways - your gateway to the skies. Find the best deals on domestic and international flights, manage your bookings, and explore exciting destinations with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased min-h-screen`}>
        <main>{children}</main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
