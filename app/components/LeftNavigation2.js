"use client";

// LeftNavigation2.js
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { Button, useDisclosure } from "@nextui-org/react";
import { message } from "antd";
import Model from "@/app/components/Model";
import { usePathname } from "next/navigation";
import CreateAlertForm from './forms/webpages/CreateAlertForm';
import { UserDashboardNavigation } from "@/app/data/UserDashboardNavigation";
import { PContentNavigation } from '../data/PContentNavigation';
import { AdminDashboardNavigation } from '../data/AdminDashboardNavigation';
import AddPinnedDataPacketForm from "@/app/components/forms/PinnedDataPackets/AddPinnedDataPacketForm";
import AddAIDataPackets from "@/app/components/forms/AIDataPackets/AddAIDataPackets";

const LeftNavigation2 = ({params}) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [subNavigationItems, setSubNavigationItems] = useState([]); // sub navigation items
    const [formTitle, setFormTitle] = useState(""); // form title

    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const notificationMessage = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };

    // get url pathname
    const fullPathname = usePathname();

    let pathname, mainPath;

    if (fullPathname.split("/")[1] === "admin") {
        pathname = [fullPathname.split("/")[2], fullPathname.split("/")[3]].join("/")
        mainPath = fullPathname.split("/")[2]

    } 
    else if (fullPathname.split("/")[1] === "pros"){
        pathname = [fullPathname.split("/")[2], fullPathname.split("/")[3]].join("/")
        mainPath = fullPathname.split("/")[2]
    }
    else {
        pathname = [fullPathname.split("/")[3], fullPathname.split("/")[4]].join("/")
        mainPath = fullPathname.split("/")[3]
    }

    const handleAddButton = () => {
        onOpen();
    }

    // TODO: Add more components for add form
    const getComponentByPath = (pathname, notificationMessage) => {

        if (fullPathname.split("/")[3] === "packets") {
            return <AddPinnedDataPacketForm notificationMessage={notificationMessage} folder_id={fullPathname.split("/")[4]} web_id={fullPathname.split("/")[2]} />;
        }

        if (fullPathname.split("/")[3] === "ai-packets") {
            return <AddAIDataPackets notificationMessage={notificationMessage} folder_id={fullPathname.split("/")[4]} web_id={fullPathname.split("/")[2]} />;
        }

        switch (pathname) {
            // case "web/packets":
            //     return <AddPinnedDataPacketForm notificationMessage={notificationMessage} web_id={fullPathname.split("/")[2]} />;
            case "web/ai":
                return <AddAIDataPackets notificationMessage={notificationMessage} web_id={fullPathname.split("/")[2]} />;
            case "Analytics/alert":
                return <CreateAlertForm notificationMessage={notificationMessage} />;
            case "api/endpoints":
                return <AddRatelimitForm notificationMessage={notificationMessage} />;
            case "marketplace/template":
                return <AddTemplateForm notificationMessage={notificationMessage} />;
            case "chat/message-templates":
                return <AddAutoRespondsForm notificationMessage={notificationMessage}/>;
            case "users/manage-admins":
                return <AddAdminForm notificationMessage={notificationMessage} />;
            case "api/subscribers":
                return <AddApiSubscriberForm notificationMessage={notificationMessage} />;
            case "dashbord/BlockList":
                return <AddToBlockList notificationMessage={notificationMessage} />;
            default:
                return null;
        }
    };

    useEffect(() => {
        if (fullPathname.split("/")[1] === "u") {
            const navigationItem = UserDashboardNavigation.find(item => item.url.split('/')[1] === mainPath);

            if (mainPath === "packets")
                setSubNavigationItems(UserDashboardNavigation.find(item => item.url.split('/')[1] === "web").children);

            navigationItem &&
            navigationItem.children && setSubNavigationItems(navigationItem.children);
        }
        else if (fullPathname.split("/")[1] === "pros") {
            const navigationItem = PContentNavigation.find(item => item.url.split('/')[1] === fullPathname.split("/")[1]);
            navigationItem &&
            navigationItem.children && setSubNavigationItems(navigationItem.children);
        }
        else if(fullPathname.split("/")[1] == "admin") {
            const navigationItem = AdminDashboardNavigation.find(item => item.url.split('/')[1] === mainPath);
            navigationItem &&
            navigationItem.children && setSubNavigationItems(navigationItem.children);
        }
    }, [mainPath]);


    return (
        <>
            {contextHolder}
            <Model modelForm={getComponentByPath(pathname, notificationMessage)} title={
                pathname === "web/packets" ? "Add Pinned Data Packet" :
                    fullPathname.split("/")[3] === "packets" ? "Add Pinned Data Packet" :
                    ""
            } button={"Add"}
                isOpen={isOpen} onOpenChange={onOpenChange} />

            <nav className="w-48 h-full fixed top-0 left-16">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-transparent dark:bg-transparent mt-24">
                    <ul className="space-y-2 font-medium">

                        {/* add button */}
                        {getComponentByPath(pathname, notificationMessage) && (
                            <li className={"mb-8"}>
                                <div className={"inline-block ml-2"}>
                                    <Button color="primary" className={"w-32 h-12"} variant={"flat"}
                                        onPress={handleAddButton}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        Add
                                    </Button>
                                </div>
                            </li>
                        )}

                        {subNavigationItems.length > 0 && subNavigationItems.map((item, index) => (
                            <li key={index}>
                                <Link href={item.url ? item.url : "/u"}
                                    className={`flex items-center p-2 ml-2 pl-4 text-gray-900 dark:text-white 
                                      dark:hover:bg-gray-700 group hover:bg-gray-100 rounded-3xl
                                      ${[item.url.split('/')[1], item.url.split('/')[2]].join('/') === pathname && " bg-gray-800"}
                                      `}>
                                    {item.icon && item.icon}
                                    <p className="ms-3 text-sm font-normal">{item.name && item.name}</p>
                                </Link>
                            </li>
                        ))}

                    </ul>
                </div>
            </nav>
        </>
    );
};

export default LeftNavigation2;