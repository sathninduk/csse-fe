'use client';

// Importing modules
import Table from "@/app/components/Table";
import React, {useCallback, useEffect} from "react";
import{
    GetAutoResponds,
    deleteAutoResponds,
    deleteAutoRespondsBulk,
    getAutoRespondsByDatetime,
    getAutoRespondsByDatetimeCount,
    getAutoRespondsByStatus,
    getAutoRespondsByStatusCount,
    getAutoRespondsCount,
    updateAutoRespondsStatus,
    updateAutoRespondsStatusBulk,
}from "@/services/AutoRespondService";

import {useDisclosure} from "@nextui-org/react";

import {message} from "antd";
import EditAutomatedMessageForm from "@/app/components/forms/webchats/EditAutomatedMessageForm";
import {useParams} from "next/navigation";


// Webpages component
export default function AutomatedMessage() {

    // ----------------------- DEFAULT COLUMNS -------------------------
    // default columns // TODO: Change the following functions
    const dateColumn = "datetime" // default date column
    const sortColumn = {column: "id", direction: "ascending"} // default sort column

    // ----------------------- MESSAGE ------------------------- (NO NEED OF CHANGING)
    // message
    const [messageApi, contextHolder] = message.useMessage();
    const headerMessage = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
        });
    }

    // ----------------------- STATES ------------------------- (NO NEED OF CHANGING)
    // states
    const [searchFieldValue, setSearchFieldValue] = React.useState("");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [data, setData] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [pagesCount, setPagesCount] = React.useState(0);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [searchColumn, setSearchColumn] = React.useState(sortColumn.column); // default search column

    const { webId } = useParams()


    // ----------------------- COLUMNS -------------------------
    // columns // TODO: Change the following columns according the to yours
    const columns = [
        {name: "ID", uid: "id", sortable: true, type: "text"},
        {name: "MESSAGE", uid: "message", sortable: true, type: "text"},
        {name: "TRIGGER", uid: "trigger", sortable: true, type: "text"},
        {name: "CREATED ON", uid: "last_updated", sortable: false, type: "datetime"},
        {name: "STATUS", uid: "status", sortable: false, type: "status"},
        {name: "CHANGE STATUS", uid: "statusButtons", sortable: false, type: "statusButtons"},
        {name: "ACTIONS", uid: "menu", sortable: false, type: "menu"},
        // all usable types: text, twoText, datetime, label, status, statusButtons, buttons, menu, copy, icon, iconText, iconTwoText
    ];

    // initially visible columns // TODO: Change the following columns according the to yours
    const init_cols = [
        "message",
        "trigger",
        "last_updated",
        "status",
        "statusButtons",
        "menu"
    ];
    // components // TODO: Change the following components
    const components = {
        status: true, // status component
        columns: true, // columns component
        refresh: true, // refresh component
        bulk_actions: true, // bulk actions component
        all: true, // all components
        today: true, // today component
        yesterday: true, // yesterday component
        search: true, // search component
        date_range: true, // date range component
        export: true, // export component
    }

    // ----------------------- BUTTONS -------------------------
    // 1. action buttons (buttons)
    /***
     * 1. To use following button set, first you have to add a column with the type of "buttons"
     * 2. Not compulsory to use, you can either use or ignore
     * 3. You can define button functions first, which describes what happens when clicked
     * 5. Change the button names, texts, icons, types and functions
     ***/
        // action button functions
    const viewButton = (id) => { // view button function // TODO: Change the following function
            // not used here
            // console.log("view: " + id);
        }

    const editButton = (id) => { // edit button function // TODO: Change the following function
        // not used here
        // console.log("edit: " + id);
    }

    const deleteButton = (id) => { // delete button function // TODO: Change the following function
        // not used here
        // console.log("delete: " + id);
    }

    // action buttons // TODO: Change the following buttons
    const actionButtons = [
        {name: "View", text: "View", icon: "", type: "default", function: viewButton},
        {name: "Edit", text: "Edit", icon: "", type: "primary", function: editButton},
        {name: "Delete", text: "Delete", icon: "", type: "danger", function: deleteButton},
    ];


    // 2. menu buttons (3 dots button)
    /***
     * 1. To use following menu button set, first you have to add a column with the type of "menu"
     * 2. Not compulsory to use, you can either use or ignore
     * 3. You can define button functions first, which describes what happens when clicked
     * 5. Change the button names, texts, icons, types and functions
     ***/
        // menu button functions
    const viewMenuButton = (id) => { // view button function // TODO: Change the following function
            // not used here
            // console.log("view: " + id);
        }

    const editMenuButton = (id) => { // edit button function // TODO: Change the following function
        // not used here
        // console.log("edit: " + id);
    }

    const deleteMenuButton = (id) => { // delete button function // TODO: Change the following function

        // delete function

        deleteAutoResponds(id,webId).then(() => {

            refreshData("success", "Deleted");
        }).catch((error) => {
            headerMessage("error", error.response.data.error);
        });

    }

    // menu buttons // TODO: Change the following buttons
    const menuButtons = [
        {name: "View", text: "View", function: viewMenuButton},
        {name: "Edit", text: "Edit", function: onOpen}, // edit function set to open model (onOpen function)
        {name: "Delete", text: "Delete", function: deleteMenuButton},
    ];


    // 3. status options (status of the data and buttons to change the status)
    /***
     * 1. To show status as a label, first you have to add a column with the type of "status"
     * 1. To use following status button set (to change the status), then you have to add a column with the type of "statusButtons"
     * 2. Not compulsory to use, you can either use or ignore
     * 3. You can define button functions first, which describes what happens when clicked
     * 5. Change the button names, texts, icons, types and functions
     * 6. You can add more status options
     ***/

        // update status button function // TODO: Change the following function
    const updateStatusButton = (id, status) => {

            // update status function

            updateAutoRespondsStatus(id, status,webId).then(() => {

                refreshData("success", "Updated");
            }).catch((error) => {
                headerMessage("error", error.response.data.error);
            });

        }

    // status options // TODO: Change the following options
    const statusOptions = [
        {
            name: "Disabled", // status name
            uid: 0, // status id (the value in the database)
            type: "", // status type (color) ["", primary, secondary, danger, warning, success]
            button: true, // if you want to show a button to change the status
            currentStatus: [1], // button showing status, ex: if currently status is 1, then the button will be shown | can use [1,2,...] for multiple statuses
            function: updateStatusButton, // function to change the status

            // icon
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
        },
        {
            name: "Enabled", // status name
            uid: 1, // status id (the value in the database)
            type: "primary", // status type (color) [danger, warning, success, primary]
            button: true, // if you want to show a button to change the status
            currentStatus: [0], // button showing status, ex: if currently status is 1, then the button will be shown | can use [1,2,...] for multiple statuses
            function: updateStatusButton, // function to change the status

            // icon
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
        }

        // ...add more status options (if needed)

    ]

    // ----------------------- BULK ACTION FUNCTIONS -------------------------
    // update status bulk function
    const updateStatusBulk = (ids, status) => {

        // update status bulk function // TODO: Change the following function

        updateAutoRespondsStatusBulk(ids, status,webId).then(() => {

            refreshData("success", "Updated");
        }).catch((error) => {
            headerMessage("error", error.response.data.error);
        });

    };

    // handle delete bulk function -- NO NEED OF CHANGING
    const handleUpdateStatusBulk = (selectedKeys, status) => {
        if (selectedKeys === 'all') { // if all items are selected

            updateStatusBulk(data.map(item => item.id), status,webId);

        } else {
            updateStatusBulk(
                Array.from(selectedKeys).map((str) => parseInt(str, 10)),
                status
            );
        }
    };

    // delete bulk
    const deleteBulk = (ids) => {

        // delete bulk function // TODO: Change the following function

        deleteAutoRespondsBulk(ids,webId).then(() => {

            refreshData("success", "Deleted");
        }).catch((error) => {
            headerMessage("error", error.response.data.error);
        });

    }

    // handle delete bulk function -- NO NEED OF CHANGING
    const handleDeleteBulk = (selectedKeys) => {
        if (selectedKeys === 'all') { // if all items are selected
            deleteBulk(data.map(item => item.id));
        } else {
            deleteBulk(
                Array.from(selectedKeys).map((str) => parseInt(str, 10))
            );
        }
    }

    // ----------------------- DATA FETCHING FUNCTIONS -------------------------
    // refresh data function
    const refreshData = (type, message) => {

        // success message
        if (type === "success")
            headerMessage(type, message);

        // fetch data count from API // TODO: Change the following function

        getAutoRespondsCount(searchColumn, searchFieldValue,webId).then((response) => setPagesCount(response));

        // fetch data from API // TODO: Change the following function
        GetAutoResponds(rowsPerPage, currentPage, searchColumn, searchFieldValue,webId)

            .then(response => setData(response === null ? [] : response.length === 0 ? [] : response))
            .catch(error => console.error(error));

    }

    // Fetch table data
    const fetchTableData = (useCallback((page, key, val) => {

        // fetch data count from API // TODO: Change the following function

        getAutoRespondsCount(key, val,webId).then((response) => setPagesCount(response));

        // fetch data from API // TODO: Change the following function
        GetAutoResponds(rowsPerPage, page, key, val, webId)
            .then(response => setData(response === null ? [] : response.length === 0 ? [] : response))
            .catch(error => console.error(error));
    }, [rowsPerPage, webId]));


    // useEffect to fetch data -- NO NEED OF CHANGING
    useEffect(() => {
        fetchTableData(currentPage, searchColumn, searchFieldValue);
    }, [currentPage, fetchTableData, rowsPerPage]);


    // ----------------------- DATE RANGE FUNCTIONS -------------------------
    // date range change function
    const onTimeRangeChange = (start, end) => {
        if (start === null || end === null) {
            fetchTableData(currentPage, searchColumn, searchFieldValue);
        } else {
            // get data count // TODO: Change the following function

            getAutoRespondsByDatetimeCount(start, end, searchColumn, searchFieldValue,webId).then((response) => setPagesCount(response));

            // get data // TODO: Change the following function
            getAutoRespondsByDatetime(rowsPerPage, currentPage, start, end, searchColumn, searchFieldValue,webId).then(response => setData(response === null ? [] : response.length === 0 ? [] : response))

        }
    }


    // ----------------------- STATUS CHANGE FUNCTIONS -------------------------
    // status change function
    const statusChange = (statusArray) => {
        // get data count // TODO: Change the following function

        getAutoRespondsByStatusCount(statusArray, searchColumn, searchFieldValue,webId).then((response) => setPagesCount(response));

        // get data // TODO: Change the following function
        getAutoRespondsByStatus(rowsPerPage, currentPage, statusArray, searchColumn, searchFieldValue,webId).then(response => setData(response === null ? [] : response.length === 0 ? [] : response))

    }


    // ----------------------- TABLE FUNCTIONS ------------------------- (NO NEED OF CHANGING)

    // pagination functions -- NO NEED OF CHANGING
    const setPage = (page) => { // set page
        setCurrentPage(page);
    }

    // rows per page change function -- NO NEED OF CHANGING
    const changeRowsPerPage = (count) => {
        // get current top item
        let currentTopItem = rowsPerPage * (currentPage - 1) + 1;

        // set current page
        if (currentTopItem > count) {
            setCurrentPage(Math.ceil(currentTopItem / count));
        }

        // set rows per page
        setRowsPerPage(count);
    }

    // sort change function -- NO NEED OF CHANGING
    const changeSorting = (sort) => {
        setSearchColumn(sort.column);
    }

    // useEffect to reset the page number -- NO NEED OF CHANGING
    useEffect(() => {
        setCurrentPage(1);
    }, [searchFieldValue]);


    // ----------------------- RETURN ------------------------- (NO NEED OF CHANGING)

    // return
    return (
        <>
            {contextHolder}
            <Table

                // data and columns
                data={data}
                columns={columns}
                init_cols={init_cols}

                // fetch data functions
                fetchTableData={fetchTableData}

                // action buttons
                actionButtons={actionButtons}
                statusOptions={statusOptions}
                menuButtons={menuButtons}

                // status change
                statusChange={statusChange}

                // edit model and functions
                editMenuButton={editMenuButton}
                editItemIsOpen={isOpen}
                editItemOnOpenChange={onOpenChange}
                editForm={<EditAutomatedMessageForm refreshData={refreshData}/>}

                // search, sorting and filtering
                searchColumn={searchColumn}
                sortColumn={sortColumn}
                dateColumn={dateColumn}
                onTimeRangeChange={onTimeRangeChange}
                searchFieldValue={[searchFieldValue, setSearchFieldValue]}
                changeSorting={changeSorting}

                // bulk actions
                handleUpdateStatusBulk={handleUpdateStatusBulk}
                handleDeleteBulk={handleDeleteBulk}

                //components
                components={components}

                // pagination
                setPage={setPage}
                currentPage={currentPage}
                dataCount={pagesCount}
                rowsPerPage={rowsPerPage}
                changeRowsPerPage={changeRowsPerPage}

            />
        </>
    )
}