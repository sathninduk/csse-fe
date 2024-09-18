'use client';
// Importing modules
import Table from "@/app/components/Table";
import React, {useCallback, useEffect} from "react";
import {
    deletePage,
    deleteWebpagesBulk,
    getPagesByDatetime,
    getPagesByDatetimeCount,
    getPagesByStatus,
    getPagesByStatusCount,
    getWebPages,
    getWebPagesCount,
    updateWebpagesStatus,
    updateWebpagesStatusBulk
} from "@/services/WebpagesService";
import {useDisclosure} from "@nextui-org/react";
import EditWebpageForm from "@/app/components/forms/webpages/EditWebpageForm";
import {message} from "antd";
import {useRouter} from "next/navigation";
import {getPinnedFolders, getPinnedFoldersCount} from "@/services/PinnedDataPacketsService";

// Webpages component
export default function PinnedFolders({params}) {

    const router = useRouter();

    // ----------------------- DEFAULT COLUMNS -------------------------
    // default columns // TODO: Change the following functions
    const dateColumn = "last_updated" // default date column
    const sortColumn = {column: "page", direction: "ascending"} // default sort column

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

    // ----------------------- COMPONENTS -------------------------
    // components // TODO: Change the following components
    const components = {
        status: false, // status component
        columns: true, // columns component
        refresh: true, // refresh component
        bulk_actions: true, // bulk actions component
        all: false, // all components
        today: false, // today component
        yesterday: false, // yesterday component
        search: true, // search component
        date_range: false, // date range component
        export: true, // export component
    }

    // ----------------------- COLUMNS -------------------------
    // columns // TODO: Change the following columns according the to yours
    const columns = [
        // {name: "ID", uid: "id", sortable: true, type: "text"},
        {name: "PAGE", uid: "page", sortable: true, type: "text"},
        {name: "CREATED", uid: "init_datetime", sortable: false, type: "datetime"},
        {name: "UPDATED", uid: "last_updated", sortable: false, type: "datetime"},
        {name: "SIZE (BYTES)", uid: "size", sortable: false, type: "text"},
        {name: "ELEMENTS COUNT", uid: "elements_count", sortable: false, type: "text"},
        {name: "", uid: "buttons", sortable: false, type: "buttons"},
        // {name: "ACTIONS", uid: "menu", sortable: false, type: "menu"},
        // all usable types: text, twoText, datetime, label, status, statusButtons, buttons, menu, copy, icon, iconText, iconTwoText
    ];

    // initially visible columns // TODO: Change the following columns according the to yours
    const init_cols = [
        "page",
        "size",
        "elements_count",
        "init_datetime",
        "last_updated",
        "buttons",
        "menu"
    ];

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
            console.log("view: " + id);
            router.push(`../packets/${id}`)
        }

    // action buttons // TODO: Change the following buttons
    const actionButtons = [
        {name: "View", text: "View", icon: "", type: "default", function: viewButton},
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
        deletePage(id).then(() => {
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
            updateWebpagesStatus(id, status).then(() => {
                refreshData("success", "Updated");
            }).catch((error) => {
                headerMessage("error", error.response.data.error);
            });

        }

    // status options // TODO: Change the following options
    const statusOptions = [

        // ...add more status options (if needed)

    ]

    // ----------------------- BULK ACTION FUNCTIONS -------------------------
    // update status bulk function
    const updateStatusBulk = (ids, status) => {

        // update status bulk function // TODO: Change the following function
        updateWebpagesStatusBulk(ids, status).then(() => {
            refreshData("success", "Updated");
        }).catch((error) => {
            headerMessage("error", error.response.data.error);
        });

    };

    // handle delete bulk function -- NO NEED OF CHANGING
    const handleUpdateStatusBulk = (selectedKeys, status) => {
        if (selectedKeys === 'all') { // if all items are selected
            updateStatusBulk(data.map(item => item.id), status);
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
        deleteWebpagesBulk(ids).then(() => {
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
        getPinnedFoldersCount(searchColumn, searchFieldValue, params.webId).then((response) => setPagesCount(response));

        // fetch data from API // TODO: Change the following function
        getPinnedFolders(rowsPerPage, currentPage, searchColumn, searchFieldValue, params.webId)
            .then(response => setData(response === null ? [] : response.length === 0 ? [] : response))
            .catch(error => console.error(error));

    }

    // Fetch table data
    const fetchTableData = (useCallback((page, key, val) => {

        // fetch data count from API // TODO: Change the following function
        getPinnedFoldersCount(key, val, params.webId).then((response) => setPagesCount(response));

        // fetch data from API // TODO: Change the following function
        getPinnedFolders(rowsPerPage, page, key, val, params.webId)
            .then(response => setData(response === null ? [] : response.length === 0 ? [] : response))
            .catch(error => console.error(error));

    }, [rowsPerPage]));

    // useEffect to fetch data -- NO NEED OF CHANGING
    useEffect(() => {
        // fetchTableData(currentPage, searchColumn, searchFieldValue);
    }, [currentPage, fetchTableData, rowsPerPage]);


    // ----------------------- DATE RANGE FUNCTIONS -------------------------
    // date range change function
    const onTimeRangeChange = (start, end) => {
        if (start === null || end === null) {
            fetchTableData(currentPage, searchColumn, searchFieldValue);
        } else {
            // get data count // TODO: Change the following function
            getPagesByDatetimeCount(start, end, searchColumn, searchFieldValue).then((response) => setPagesCount(response));

            // get data // TODO: Change the following function
            getPagesByDatetime(rowsPerPage, currentPage, start, end, searchColumn, searchFieldValue).then(response => setData(response === null ? [] : response.length === 0 ? [] : response))
        }
    }


    // ----------------------- STATUS CHANGE FUNCTIONS -------------------------
    // status change function
    const statusChange = (statusArray) => {
        // get data count // TODO: Change the following function
        getPagesByStatusCount(statusArray, searchColumn, searchFieldValue).then((response) => setPagesCount(response));

        // get data // TODO: Change the following function
        getPagesByStatus(rowsPerPage, currentPage, statusArray, searchColumn, searchFieldValue).then(response => setData(response === null ? [] : response.length === 0 ? [] : response))
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
                editForm={<EditWebpageForm refreshData={refreshData}/>}

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

                // pagination
                setPage={setPage}
                currentPage={currentPage}
                dataCount={pagesCount}
                rowsPerPage={rowsPerPage}
                changeRowsPerPage={changeRowsPerPage}

                // components
                components={components}

                // selection mode
                selectionMode="none"
            />
        </>
    )
}