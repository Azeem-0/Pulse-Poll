import type { Metadata } from "next";
import localFont from "next/font/local";
import { ToastContainer } from 'react-toastify';
import NavigationBar from "@/components/navigation/NavigationBarComponent";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';


export const metadata: Metadata = {
  title: "PulsePoll",
  description: "Browse through the latest polls, cast your vote, and stay updated with real-time results. Join the conversation today",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-[#EEEEEC] font-roboto font-normal">
        <NavigationBar />
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
