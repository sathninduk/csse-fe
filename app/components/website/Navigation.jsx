import useDarkMode from "@/app/hooks/useDarkMode";
import {useEffect, useState} from "react";

export default function Navigation() {

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

    const logoSrc = scrolled
        ? '/images/logos/verita-logo-white.png'
        : '/images/logos/verita-logo-dark.png';

    return (
        <>
            <div className={`top-0 w-full p-4 md:pr-12 md:pl-12 fixed z-50 ${scrolled ? " bg-dark shadow-xl" : ""}`}
                 style={{
                     // borderBottomRightRadius: "20px",
                     // borderBottomLeftRadius: "20px",
                 }}
            >
                <div className={"flex justify-between"}>
                    <a href="/" className="flex z-50 items-center">
                        <img src={logoSrc} className="w-20" alt="Verita Logo"/>
                    </a>
                    <div className={"flex items-center gap-4 md:gap-8"}>
                        <a href={"/login"} className={`${scrolled ? "text-dark" : "text-light"} text-xs`}>
                            <span className={"inline mr-1 md:mr-2"}>
                                Sign in
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-4 h-4 inline">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"/>
                            </svg>
                        </a>
                        <a href={"/signup"} className={`${scrolled ? "text-dark" : "text-light"} text-xs`}>
                            <span className={"inline mr-1 md:mr-2"}>
                                Sign up
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-4 h-4 inline">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}