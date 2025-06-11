import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import React from "react";
import Link from "next/link";
import MapIcon from "@mui/icons-material/Map";
import ListAllIcon from '@mui/icons-material/ListAlt';
import SettingsIcon from '@mui/icons-material/Settings';

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <AppRouterCacheProvider>

        {children} 
        <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0}}>
        <BottomNavigation showLabels > { /* TODO: These use link and are thus prefetching - think about whether this is needed in terms of firebase document reads (Are we going to read once after location services are enabled or location input first and thus we page our results and keep these in memory so we can prefetch without loading more data from firebase) */ }
          <BottomNavigationAction label="Map" icon={<MapIcon />} LinkComponent={Link} href="/map"/>
          <BottomNavigationAction label="List" icon={<ListAllIcon />} LinkComponent={Link} href="/list" />
          <BottomNavigationAction label="Settings" icon={<SettingsIcon />} LinkComponent={Link} href="/settings" />
        </BottomNavigation>
        </Box>

        {/* <Offset /> */}

        </AppRouterCacheProvider>
      </body>
    </html>
  );
  
}