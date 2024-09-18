"use client";

import Link from "next/link";
import React, {useEffect, useState} from "react";
import {DeleteSiteService, GetSitesService} from "@/services/SitesService";
import {Button, useDisclosure} from "@nextui-org/react";
import {Badge, message} from "antd";
import {useRouter} from "next/navigation";
import DashboardNav from "@/app/components/DashboardNav";
import DashboardFooter from "@/app/layouts/DashboardFooter";
import Model from "@/app/components/Model";
import AddWebProjectForm from "@/app/components/forms/project/AddWebProjectForm";
import EditWebProjectForm from "@/app/components/forms/project/EditWebProjectForm";
import Keys from "@/Keys";
import {GetGitHubToken, getGitHubToken} from "@/services/GitHubService";

export default function Dashboard() {

    const [sites, setSites] = useState([]);
    const [webId, setWebId] = useState(null);
    const [gitHubToken, setGitHubToken] = useState("");
    const [open, setOpen] = useState(false);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const router = useRouter();

    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };

    const handleGitHubOpen = () => {
        Message("info", "Please connect with GitHub to add a project");
    }

    const handleOpenAddProject = async () => {
        await setWebId("");
        await onOpen();
    }

    const handleOpenEditProject = async (id) => {
        await setWebId(id);
        await onOpen();
    }

    const DeleteSite = (id) => {
        // delete site
        DeleteSiteService(id).then(async () => {
            await Message("success", "Project deleted");

            // get sites from getSitesService
            await GetSitesService().then((response) => {
                setSites(response);
            });
        }).catch((error) => {
            Message("error", "Error deleting project");
        });
    }

    useEffect(() => {
        // get sites from getSitesService
        GetSitesService().then((response) => {
            setSites(response);
        });
    }, []);

    useEffect(() => {
        GetGitHubToken().then((response) => {
            console.log(response.github_token);
           setGitHubToken(response.github_token);
        });
    }, []);

    async function handleInstallationCopyScript(id) {
        await navigator.clipboard.writeText(`
            <!-- CSSE Header -->
            <script>const csse_key = "${id}";</script>
            <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/axios@0.27.2/dist/axios.min.js"></script>
            <script async id="csse_script" src="${Keys.CONNECTOR_URL}"></script>
            <!-- CSSE Header -->`);
    }

    return (
        <>
            {contextHolder}
            <DashboardNav/>

            <Model modelForm={
                webId === "" ?
                    <AddWebProjectForm/> : <EditWebProjectForm webId={webId}/>
            } title={webId === "" ? "Add Project" : "Edit Project"} isOpen={isOpen} onOpenChange={onOpenChange}/>

            <div className={"p-12 pt-24 pb-10 md:pr-48 md:pl-48 md:pt-36 md:pb-20"}
                 style={{minHeight: "calc(100vh - 93px)"}}>

                <div className="flex justify-between items-center">
                    <div>
                        <h1 className={"text-2xl"}>
                            CSSE Platform
                        </h1>
                        <p className={"text-darkSecondary text-xs"}>
                            Software Verification Technology
                        </p>
                    </div>
                    <div>
                        <Button
                            onClick={() => {
                              router.push(`https://github.com/login/oauth/authorize?client_id=${Keys.GITHUB_CLIENT_ID}&scope=repo,workflow&redirect_uri=${Keys.GITHUB_REDIRECT_URL}`)
                            }}
                            variant="flat"
                            color="default"
                            className="px-5 py-5 text-white w-full"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill={"#fff"}
                                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            {gitHubToken === null || gitHubToken === undefined ?
                                <span>Connect with GitHub <Badge status="default" className={"pl-2"}/></span> :
                                <span>Connected <Badge status="success" className={"pl-2"}/></span>}
                        </Button>
                    </div>
                </div>

                {/* projects */}
                <div className={"mt-8 md:mt-12"}>
                    <div className={"grid grid-cols-1 md:grid-cols-3 gap-4 pb-6"}>

                        {/*<Link href={"/u/add"}>*/}
                        <div
                            className={"h-32 add-project-tab p-4 rounded-3xl grid justify-center con-mid cursor-pointer"}
                            onClick={gitHubToken === null || gitHubToken === undefined ?
                                handleGitHubOpen
                                : handleOpenAddProject}>
                            <div className="grid grid-cols-2 w-full">
                                <div className={"con-mid"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M12 4.5v15m7.5-7.5h-15"/>
                                    </svg>
                                </div>
                                <div className={"con-mid w-3/4"}>
                                    Add Project
                                </div>
                            </div>
                        </div>

                        {sites && sites.length > 0 && sites.map((site, index) => (
                            <div key={index} className={"project-tab p-4 rounded-3xl w-full"}>
                                <Link href={`/u/${site.id}/Analytics/overview`} className={"h-30"}>
                                    <div className={"pl-3 pt-2 pr-3"}>

                                        <h1 className={"text-md"}>{site.name}</h1>
                                        <p className={"text-xs text-gray-500"}>
                                            {site.domain}
                                        </p>

                                    </div>
                                </Link>
                                <div className={"con-mid pb-3"}>
                                    <div className={"mt-3 w-full h-6 flex justify-between items-start"}>
                                        <div>
                                            <Button
                                                className={"z-40"}
                                                size="sm"
                                                color="" variant="light"
                                                startContent={
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                                         viewBox="0 0 24 24">
                                                        <path fill={"#fff"}
                                                              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                    </svg>
                                                }
                                                onClick={() => {
                                                    let packet_url = `https://github.com/${site.domain}`;
                                                    window.open(packet_url, '_blank').focus();
                                                }}>
                                                Open Repository
                                            </Button>
                                        </div>
                                        <div>
                                            <Button
                                                isIconOnly
                                                className={"z-40"}
                                                size="sm"
                                                color="" variant="light"
                                                startContent={
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24"
                                                         strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                                    </svg>
                                                }
                                                onClick={() => {
                                                    // router.push(`/u/edit/${site.id}`)
                                                    handleOpenEditProject(site.id)
                                                }}/>
                                            <Button
                                                isIconOnly
                                                className={"z-40"}
                                                size="sm"
                                                color="danger" variant="light"
                                                startContent={
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24"
                                                         strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                                    </svg>
                                                }
                                                onClick={() => {
                                                    DeleteSite(site.id)
                                                }}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            {/* dashboard footer */}
            <DashboardFooter/>
        </>
    );
}