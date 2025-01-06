import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "@/app/theme";
import "./globals.css";
import {APP_NAME} from "@/app/hooks/useConstants";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: APP_NAME,
    description: "World Ads Center is a global platform designed to connect advertisers with audiences across various digital channels. It offers targeted advertising solutions, data analytics, and tools to help businesses optimize their marketing campaigns and reach a worldwide customer base effectively.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}
