'use client';

import React, { useState } from "react";
//import React from "react";
import CardBox from "@/app/components/Card";
import {downloadById, getActiveTemplates, getSumAndCount} from "@/services/MarketplaceService";
import {Pagination, useDisclosure} from "@nextui-org/react";
import {Drawer} from 'antd';
import Model from "@/app/components/Model";
import AddRatingsForm from "@/app/components/forms/marketplace/AddRatings";


export default function MarketplaceListing() {

    const [data, setData] = React.useState([]);
    //const [sumAndCount, setSumAndCount] = useState({ total_ratings: 0, rating_count: 0 });
    const [open, setOpen] = useState(false);
    const [drawerData, setDrawerData] = useState([])
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [currentTemplate, setCurrentTemplate] = useState(null);


    React.useEffect(() => {
        getActiveTemplates(5, 1).then((response) => {
            console.log(response);
            setData(response);
        });
    }, []);

    function testFunction() {
        console.log("Test");
    }

    const downloadFunction = (id) => { // view button function // TODO: Change the following function
        // not used here
        // console.log("view: " + id);
        downloadById(id).then((res) => {
            console.log(res.mainfile)

            const url = res.mainfile;

            // Open the URL in a new tab
            const newWindow = window.open(url, '_blank');

            // Initiate the file download
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = '';
            anchor.style.display = 'none';
            document.body.appendChild(anchor);
            anchor.click();

            // Close the tab after a short delay (e.g., 1 second)
            setTimeout(function() {
                newWindow.close();
            }, 1000); // 1 second

        }).catch((error) => {
            console.log(error)
            headerMessage("error", error.response.data.error);
        });
    }


    const showDrawer = (item) => {
        setOpen(true);
        setDrawerData(item);
    };
    const onClose = () => {
        setOpen(false);
    };

    // const calculateAverageRating = (totalRatings, ratingCount) => {
    //     if (ratingCount === 0) return 0;
    //     return totalRatings / ratingCount;
    // };

    return (
        <>
            <Model modelForm={
                <AddRatingsForm id={currentTemplate}/>
            } title={"Rate Template"} button={"Submit"} isOpen={isOpen} onOpenChange={onOpenChange}/>
            <div className={"p-6 pt-4"}>
                <h1 className={"mb-6"}>Templates</h1>
                <div className={"grid grid-cols-3 gap-6"}>
                    {data && data.length > 0 && data.map((item, index) => (
                        console.log(item.price),
                            console.log("Is download disabled?", item.price > 0),
                        <CardBox
                            key={index}
                            title={item.name}
                            secondary={item.category}
                            image="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                            //image={item.thmbnlfile}
                            title2 = {item.price}
                            //secondary2={`Average Rating: ${calculateAverageRating(item.total_ratings, item.rating_count).toFixed(2)}`}
                            description={item.description}
                            buttons={[
                                { name: "Details", color: "primary", onClick: () => showDrawer(item) },
                                {name: "Download", color: "danger", onClick: () => {
                                        if (item.price > 0) {
                                            //return <AddTemplateForm />;
                                        } else {
                                            downloadFunction(item.id);
                                        }
                                    }, disabled: item.price > 0},

                                {name: "Rate", color: "warning", onClick: () => {
                                        setCurrentTemplate(item.id);
                                        onOpen();
                                    }}]}

                            className="col-span-1 w-full"
                        />
                    ))}
                </div>
                <div className="mx-auto mt-6" style={{display: "table"}}>
                    <Pagination total={10} initialPage={1}/>
                </div>
                <Drawer title="Developer's Message: " onClose={onClose} open={open} className="overflow-y-auto max-h-60">
                    {drawerData && (
                        <div>
                            <p>{drawerData.dmessage}</p>
                        </div>
                    )}
                </Drawer>
            </div>
        </>
    );
}
