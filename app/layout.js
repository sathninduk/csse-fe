import {Plus_Jakarta_Sans} from "next/font/google";
import "./globals.css";
import React from "react";
import {ConfigProvider} from "antd";
import {darkAlgorithm} from "@/ant.config";

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    display: 'swap',
    weight: ['200', '300', '400', '500', '700', '800']
});

export const metadata = {
    title: "CSSE",
    description: "Generated by create next app",
};

export default function RootLayout({children}) {

    return (
        <html lang="en">
        <body className={`${plus_Jakarta_Sans.className} font-normal dark`}>
        <ConfigProvider
            theme={{
                token: darkAlgorithm
            }}
        >
            {children}
        </ConfigProvider>
        </body>
        </html>
    );
}
