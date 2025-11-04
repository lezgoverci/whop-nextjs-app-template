import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import FontProvider from "@/components/font-provider";
import TypographyProvider from "@/components/typography-provider";

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
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased frosted-ui">
                <FontProvider />
                <TypographyProvider />
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
