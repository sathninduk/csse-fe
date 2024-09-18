'use client';

import {useLayoutEffect, useState} from "react";

const useDarkMode = () => {

    const [isDarkMode, setIsDarkMode] = useState(true);

    // window query to detect dark mode
    // const isWindowDefined = typeof window !== 'undefined';
    //
    // const [isDarkMode, setIsDarkMode] = useState(async () => {
    //     if (isWindowDefined) {
    //         return window.matchMedia('(prefers-color-scheme: dark)').matches;
    //     }
    //     return false;
    // });
    //
    // useLayoutEffect(() => {
    //     if (isWindowDefined) {
    //         const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    //
    //         const handleChange = () => {
    //             setIsDarkMode(mediaQuery.matches);
    //         };
    //
    //         mediaQuery.addListener(handleChange);
    //
    //         return () => {
    //             mediaQuery.removeListener(handleChange);
    //         };
    //     }
    // }, [isWindowDefined]);

    // const toggleDarkMode = () => {
    //     setIsDarkMode((prevMode) => !prevMode);
    // };

    // return [isDarkMode, toggleDarkMode];
    return [isDarkMode, true];
};

export default useDarkMode;

