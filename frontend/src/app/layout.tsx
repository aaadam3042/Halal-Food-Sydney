import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import Header from "./header";
import NavBar from "./navbar";
import LocationBar from "./locationbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Halal Food Sydney",
  description: "A mobile-first web app for discovering halal food locations in Sydney, with a focus on *hand-slaughtered (zabīḥa)* options. Built to help the local Muslim community make informed dining decisions with up-to-date halal verification data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // TODO: Make the bottom nav bar not cover the content. Styled doesnt work due to server-side rendering and the way nextjs handles css modules.
  
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <AppRouterCacheProvider>

        <Header />

          {children} 

        <NavBar />

        </AppRouterCacheProvider>
      </body>
    </html>
  );
  
}