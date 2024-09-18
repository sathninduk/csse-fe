"use client";

import SignOutButton from "@/app/components/SignoutButton";
import Link from "next/link";
import useDarkMode from "@/app/hooks/useDarkMode";
import SettingsButton from "@/app/components/SettingsButton";
import {useEffect, useState} from "react";

export default function DashboardNav() {

    const [isDarkMode, toggleDarkMode] = useDarkMode();

    // const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // const toggleMobileMenu = () => {
    //     setMobileMenuOpen(!isMobileMenuOpen);
    // };

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            setScrolled(isScrolled);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const logoSrc = isDarkMode
        ? '/images/logos/csse-logo-white.png'
        : '/images/logos/csse-logo-dark.png';

    return (
        <>
            <div className={`w-full bg-dark p-4 md:pr-12 md:pl-12 fixed z-50 ${scrolled ? " shadow-xl" : ""}`}>
                <div className={"flex justify-between"}>
                    <Link href="/" className="flex z-50 items-center">
                        <img src={logoSrc} className="w-20" alt="CSSE Logo"/>
                    </Link>
                    <div className={"flex items-center gap-2"}>
                        <SettingsButton/>
                        <SignOutButton/>
                    </div>
                </div>
            </div>
        </>
    )
}