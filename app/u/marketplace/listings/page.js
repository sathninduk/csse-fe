'use client';

import React, { useState } from "react";
//import React from "react";
import CardBox from "@/app/components/Card";
import {downloadById, getActiveTemplates, getByCategory} from "@/services/MarketplaceService";
import {Button, Pagination, useDisclosure, Select, SelectItem} from "@nextui-org/react";
import items from "@/app/data/template_categories";
import {Drawer} from 'antd';
import Model from "@/app/components/Model";
import AddRatingsForm from "@/app/components/forms/marketplace/AddRatings";
import {useRouter} from "next/navigation";

//MarketplaceListing function to display the templates in the marketplace
export default function MarketplaceListing() {

    const router = useRouter();

    const [data, setData] = React.useState([]);
    const [open, setOpen] = useState(false);
    const [drawerData, setDrawerData] = useState([])
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [currentTemplate, setCurrentTemplate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    //use state to get the category of the template
    const [category, setCategory] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Travel");

    const fetchData = (page) => {
        getActiveTemplates(6, page).then((response) => {
            console.log(response);
            setData(response);
        });
    }

    React.useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    // function testFunction() {
    //     console.log("Test");
    // }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        console.log(category.target.value);
        getByCategory(currentPage, 6, category.target.value)
            .then((response) => {
                console.log(response);
                setData(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

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

    return (
        <>
            <Model modelForm={
                <AddRatingsForm id={currentTemplate} templateId={currentTemplate}/>
            } title={"Rate Template"} button={"Submit"} isOpen={isOpen} onOpenChange={onOpenChange}/>
            <div className={"p-6 pt-4"}>
                <h1 className={"mb-6"} style={{fontSize: "2em"}}>Templates Library</h1>
                <div className="flex justify-start">
                    <Select
                        label="Filter by Category"
                        fontSize="32px"
                        color="success"
                        className="w-40"
                        value={category}
                        onChange={handleCategorySelect}
                    >
                        {items.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>

                <div className={"flex justify-end gap-4"}>
                    <Button color="secondary" variant="flat" onClick={() => {
                        router.push("./submit-template")
                    }}>
                        Add New Template
                    </Button>
                    <Button color="primary" variant="flat" onClick={() => {
                        router.push("./user-submitted-temp")
                    }}>
                        My Templates
                    </Button>
                    {/*<Select*/}
                    {/*    label="Filter by Category"*/}
                    {/*    fontSize="32px"*/}
                    {/*    color="success"*/}
                    {/*    className="w-40"*/}
                    {/*    value={category}*/}
                    {/*    onChange={handleCategorySelect}*/}
                    {/*>*/}
                    {/*    {items.map((item) => (*/}
                    {/*        <SelectItem key={item.value} value={item.value}>*/}
                    {/*            {item.label}*/}
                    {/*        </SelectItem>*/}
                    {/*    ))}*/}

                    {/*</Select>*/}
                </div>
                <br/>


                <div className={"grid grid-cols-3 gap-6"}>
                    {data && data.length > 0 && data.map((item, index) => (
                        console.log(item.price),
                            console.log("Is download disabled?", item.price > 0),
                            <CardBox
                                key={index}
                                title={item.name}
                                secondary={item.category}
                                image={`https://storage.googleapis.com/dpacks-templates.appspot.com/${item.thmbnlfile}`}
                                title2={item.price}
                                secondary2={item.rate}
                                description={item.description}
                                buttons={[
                                    {name: "Details", color: "primary", onClick: () => showDrawer(item)},
                                    {
                                        name: "Download", color: "danger", onClick: () => {
                                            if (item.price > 0) {
                                                //return payment options
                                            } else {
                                                downloadFunction(item.id);
                                            }
                                        }, disabled: item.price > 0
                                    },

                                    {
                                        name: "Rate", color: "warning", onClick: () => {
                                            setCurrentTemplate(item.id);
                                            onOpen(item.id);
                                        }
                                    }]}

                                className="col-span-1 w-full"
                            />
                    ))}
                </div>
                <div className="mx-auto mt-6" style={{display: "table"}}>
                    <Pagination total={10} initialPage={1} onChange={(page) => setCurrentPage(page)}/>
                </div>
                <Drawer title="Developer's Message: " onClose={onClose} open={open}
                        className="overflow-y-auto max-h-60">
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
