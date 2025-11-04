import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import FontProvider from "@/components/font-provider";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
    weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
    title: "Whop App",
    description: "My Whop App",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className={inter.variable}>
            <body className="antialiased frosted-ui">
                <FontProvider />
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
