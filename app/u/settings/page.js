"use client";

import React, {useEffect, useState} from "react";
import {DeleteSiteService, GetSitesService} from "@/services/SitesService";
import {useRouter} from "next/navigation";
import DashboardNav from "@/app/components/DashboardNav";
import DashboardFooter from "@/app/layouts/DashboardFooter";

export default function UserSettings() {

    const [sites, setSites] = useState([]);
    const router = useRouter();

    const DeleteSite = (id) => {
        // delete site
        DeleteSiteService(id).then(async () => {
            // get sites from getSitesService
            await GetSitesService().then((response) => {
                setSites(response);
            });
        });
    }

    useEffect(() => {
        // get sites from getSitesService
        GetSitesService().then((response) => {
            setSites(response);
        });
    }, []);

    return (
        <>
            <DashboardNav/>

            <div className={"pr-48 pl-48 pt-36 pb-20"} style={{minHeight: "calc(100vh - 93px)"}}>

                {/* product tabs */}
                <h1>Settings</h1>

            </div>

            {/* dashboard footer */}
            <DashboardFooter/>
        </>
    );
}