'use client';

import {useState} from "react";

const useDarkMode = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return [isDarkMode, toggleDarkMode];
};

export default useDarkMode;

