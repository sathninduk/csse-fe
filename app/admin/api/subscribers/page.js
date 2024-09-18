'use client';

// Importing modules
import Table from "@/app/components/Table";
import React, {useCallback, useEffect} from "react";
import {useDisclosure} from "@nextui-org/react";
import {message} from "antd";
import {
    deleteApiSubscriber, deleteApiSubscribersBulk,
    getApiSubscribersByDatetime,
    getApiSubscribersByDatetimeCount,
    getApiSubscribersCount,
    getSubscribers, regenerateApiKey
} from "@/services/ApiSubscriberService";

// Webpages component
export default function Webpages() {

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

    const components = {
        status: false, // status component
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


    // ----------------------- COLUMNS -------------------------
    // columns // TODO: Change the following columns according the to yours
    const columns = [
        {name: "ID", uid: "id", sortable: true, type: "text"},
        {name: "User_Id", uid: "user_id", sortable: true, type: "text"},
        {name: "Client_Id", uid: "client_id", sortable: true, type: "text"},
        {name: "Key", uid: "key", sortable: false, type: "text"},
        {name: "Created_On", uid: "created_on", sortable: false, type: "datetime"},
        {name: "ACTIONS", uid: "menu", sortable: false, type: "buttons"},
        // all usable types: text, twoText, datetime, label, status, statusButtons, buttons, menu, copy, icon, iconText, iconTwoText
    ];

    // initially visible columns // TODO: Change the following columns according the to yours
    const init_cols = [
        "user_id",
        "client_id",
        "key",
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

    const regenerateButton = (id) => { // edit button function // TODO: Change the following function
        if(!confirm("Are you sure you want to regenerate?")) return;

        regenerateApiKey(id).then(() => {
            refreshData("success", "Regenerated");
        }).catch((error) => {
            headerMessage("error", error.response.data.error);
        });
    }

    const deleteButton = (id) => { // delete button function // TODO: Change the following function
        if(!confirm("Are you sure you want to delete?")) return;
        // delete function
        deleteApiSubscriber(id).then(() => {
            refreshData("success", "Deleted");
        }).catch((error) => {
            headerMessage("error", error.response.data.error);
        });
    }

    // action buttons // TODO: Change the following buttons
    const actionButtons = [
        {name: "Edit", text: "Regenerate", icon: "", type: "success", function: regenerateButton},
        {name: "Delete", text: "Delete", icon: "", type: "danger", function: deleteButton},
    ];





    // ----------------------- BULK ACTION FUNCTIONS -------------------------

    // delete bulk
    const deleteBulk = (ids) => {
        // delete bulk function // TODO: Change the following function
        deleteApiSubscribersBulk(ids).then(() => {
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
        getApiSubscribersCount(searchColumn, searchFieldValue).then((response) => setPagesCount(response));

        // fetch data from API // TODO: Change the following function
        getSubscribers(rowsPerPage, currentPage, searchColumn, searchFieldValue)
            .then(response => setData(response === null ? [] : response.length === 0 ? [] : response))
            .catch(error => console.error(error));

    }

    // Fetch table data
    const fetchTableData = (useCallback((page, key, val) => {

        // fetch data count from API // TODO: Change the following function
        getApiSubscribersCount(key, val).then((response) => setPagesCount(response));

        // fetch data from API // TODO: Change the following function
        getSubscribers(rowsPerPage, page, key, val)
            .then(response => setData(response === null ? [] : response.length === 0 ? [] : response))
            .catch(error => console.error(error));

    }, [rowsPerPage]));

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
            getApiSubscribersByDatetimeCount(start, end, searchColumn, searchFieldValue).then((response) => setPagesCount(response));

            // get data // TODO: Change the following function
            getApiSubscribersByDatetime(rowsPerPage, currentPage, start, end, searchColumn, searchFieldValue).then(response => setData(response === null ? [] : response.length === 0 ? [] : response))
        }
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

                // search, sorting and filtering
                searchColumn={searchColumn}
                sortColumn={sortColumn}
                dateColumn={dateColumn}
                onTimeRangeChange={onTimeRangeChange}
                searchFieldValue={[searchFieldValue, setSearchFieldValue]}
                changeSorting={changeSorting}

                // bulk actions
                handleDeleteBulk={handleDeleteBulk}

                // pagination
                setPage={setPage}
                currentPage={currentPage}
                dataCount={pagesCount}
                rowsPerPage={rowsPerPage}
                changeRowsPerPage={changeRowsPerPage}

                // components
                components={components}

            />
        </>
    )
}