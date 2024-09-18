// LeftNavigation1.js
import React from 'react';

import {UserDashboardNavigation} from "@/app/data/UserDashboardNavigation";
import Link from "next/link";
import {PContentNavigation} from '../data/PContentNavigation';
import {usePathname} from 'next/navigation';
import {AdminDashboardNavigation} from '../data/AdminDashboardNavigation';

const LeftNavigation1 = ({...props}) => {
    // get url pathname
    const fullPathname = usePathname();
    const path = fullPathname.split("/")[1];

    console.log(path);

    let navigationData;

    if (path === "u") {
        navigationData = UserDashboardNavigation;
    } else if (path === "pros") {
        navigationData = PContentNavigation;
    } else if (path === "admin") {
        navigationData = AdminDashboardNavigation;
    }
    return (<nav className="bg-secondaryDark w-16 h-full fixed top-0 pt-3 left-0 ">

            {/* user */}
            <button onClick={
                () => props.setIsDrawerOpen(!props.isDrawerOpen)
            } data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar"
                    style={{
                        margin: "20px",
                        marginTop: "8px"
                    }}
                    aria-controls="logo-sidebar" type="button"
                    className={`inline-flex md:hidden items-center text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}>
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd"
                          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"/>
                </svg>
            </button>

            <Link href="/u" className="p-4 text-white grid justify-center hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.1}
                     stroke="currentColor" className="w-full h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
                </svg>
            </Link>

            {navigationData && navigationData.map((item, index) => (
                <Link key={index} href={item.url} className="grid justify-center p-4 text-white hover:bg-gray-700">
                    {item.icon}
                    <p className="text-xs font-normal mt-1" style={{fontSize: "10px"}}>{item.name}</p>
                </Link>
            ))}


        </nav>
    );
};

export default LeftNavigation1;