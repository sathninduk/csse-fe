'use client';

// Importing modules
import Table from "@/app/components/Table";
import React, {useCallback, useEffect} from "react";
import {useDisclosure} from "@nextui-org/react";
import {message} from "antd";
import {
    getAdmins,
    getAdminsCount,
    deleteAdmin,
    updateAdminStatus,
    updateAdminStatusBulk,
    deleteAdminsBulk,
    getAdminsByDatetimeCount,
    getAdminsByDatetime,
    getAdminsByStatusCount,
    getAdminsByStatus
} from "@/services/AdminManagementService";
import EditAdminForm from "@/app/components/forms/admins/EditAdminForm";

// admin component
export default function Admin() {

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

    // ----------------------- COLUMNS -------------------------
    // columns //
    const columns = [
        {name: "ID", uid: "id", sortable: true, type: "text"},
        {name: "NAME", uid: "name", sortable: true, type: "text"},
        {name: "PHONE", uid: "phone", sortable: true, type: "text"},
        {name: "EMAIL", uid: "email", sortable: true, type: "email"},
        {name: "ADDED ON", uid: "added_on", sortable: false, type: "datetime"},
        {name: "STATUS", uid: "status", sortable: false, type: "status"},
        {name: "CHANGE STATUS", uid: "statusButtons", sortable: false, type: "statusButtons"},
        {name: "ACTIONS", uid: "menu", sortable: false, type: "menu"},
        // all usable types: text, twoText, datetime, label, status, statusButtons, buttons, menu, copy, icon, iconText, iconTwoText
    ];

    // initially visible columns //
    const init_cols = [
        "name",
        "phone",
        "email",
        "added_on",
        "status",
        "statusButtons",
        "menu"
    ];

    // ----------------------- BUTTONS -------------------------


    // menu buttons (3 dots button)
    // menu button functions
    const editMenuButton = (id) => { // edit button function
        // not used here
        // console.log("view: " + id);
    }

    const deleteMenuButton = (id) => { // delete button function

        // delete function
        deleteAdmin(id).then(() => {
            refreshData("success", "Deleted");
        }).catch((error) => {
            headerMessage("error", error.response.data.error);
        });

    }

    // menu buttons
    const menuButtons = [
        {name: "Edit", text: "Edit", function: onOpen}, // edit function set to open model (onOpen function)
        {name: "Delete", text: "Delete", function: deleteMenuButton},
    ];


    // status options (status of the data and buttons to change the status)

    // update status button function
    const updateStatusButton = (id, status) => {

            // update status function
            updateAdminStatus(id, status).then(() => {
                refreshData("success", "Updated");
            }).catch((error) => {
                headerMessage("error", error.response.data.error);
            });

        }

    // status options
    const statusOptions = [
        {
            name: "offline", // status name
            uid: 0, // status id (the value in the database)
            type: "danger", // status type (color) ["", primary, secondary, danger, warning, success]
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
            name: "Active", // status name
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

    ]

    // ----------------------- BULK ACTION FUNCTIONS -------------------------
    // update status bulk function
    const updateStatusBulk = (ids, status) => {

        // update status bulk function
        updateAdminStatusBulk(ids, status).then(() => {
            refreshData("success", "Updated");
        }).catch((error) => {
            headerMessage("error", error.response.data.error);
        });

    };

    // handle delete bulk function
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

        // delete bulk function
        deleteAdminsBulk(ids).then(() => {
            refreshData("success", "Deleted");
        }).catch((error) => {
            headerMessage("error", error.response.data.error);
        });

    }

    // handle delete bulk function
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

        // fetch data count from API
        getAdminsCount(searchColumn, searchFieldValue).then((response) => setPagesCount(response));

        // fetch data from API
        getAdmins(rowsPerPage, currentPage, searchColumn, searchFieldValue)
            .then(response => setData(response === null ? [] : response.length === 0 ? [] : response))
            .catch(error => console.error(error));

    }

    // Fetch table data
    const fetchTableData = (useCallback((page, key, val) => {

        // fetch data count from API
        getAdminsCount(key, val).then((response) => setPagesCount(response));

        // fetch data from API
        getAdmins(rowsPerPage, page, key, val)
            .then(response => setData(response === null ? [] : response.length === 0 ? [] : response))
            .catch(error => console.error(error));

    }, [rowsPerPage]));

    // useEffect to fetch data
    useEffect(() => {
        fetchTableData(currentPage, searchColumn, searchFieldValue);
    }, [currentPage, fetchTableData, rowsPerPage]);


    // ----------------------- DATE RANGE FUNCTIONS -------------------------
    // date range change function
    const onTimeRangeChange = (start, end) => {
        if (start === null || end === null) {
            fetchTableData(currentPage, searchColumn, searchFieldValue);
        } else {
            // get data count
            getAdminsByDatetimeCount(start, end, searchColumn, searchFieldValue).then((response) => setPagesCount(response));

            // get data
            getAdminsByDatetime(rowsPerPage, currentPage, start, end, searchColumn, searchFieldValue).then(response => setData(response === null ? [] : response.length === 0 ? [] : response))
        }
    }


    // ----------------------- STATUS CHANGE FUNCTIONS -------------------------
    // status change function
    const statusChange = (statusArray) => {
        // get data count
        getAdminsByStatusCount(statusArray, searchColumn, searchFieldValue).then((response) => setPagesCount(response));

        // get data
        getAdminsByStatus(rowsPerPage, currentPage, statusArray, searchColumn, searchFieldValue).then(response => setData(response === null ? [] : response.length === 0 ? [] : response))
    }


    // ----------------------- TABLE FUNCTIONS -------------------------

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

    // useEffect to reset the page number
    useEffect(() => {
        setCurrentPage(1);
    }, [searchFieldValue]);


    // ----------------------- RETURN -------------------------

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
                statusOptions={statusOptions}
                menuButtons={menuButtons}

                // status change
                statusChange={statusChange}

                // edit model and functions
                editMenuButton={editMenuButton}
                editItemIsOpen={isOpen}
                editItemOnOpenChange={onOpenChange}
                editForm={<EditAdminForm refreshData={refreshData}/>}

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

            />
        </>
    )
}