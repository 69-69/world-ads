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
    description: "Shop and sell with ease! Our platform combines the best of eCommerce and classifieds, offering a marketplace for both new products and second-hand goods, services, job listings, and local deals. Join a community of buyers and sellers today.",
    keywords: "e-commerce, classifieds, marketplace, buy, sell, shop, trade, local deals, job listings, services, second-hand goods",
    // description: "Discover a seamless experience where you can buy, sell, and trade. From brand-new products to used items, services, and job ads, our platform bridges eCommerce and classifieds for every need."
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
