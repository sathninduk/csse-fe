'use client';

// Importing modules
import Table from "@/app/components/Table";
import React, {useCallback, useEffect} from "react";
import {
    deleteTemplate,
    deleteTemplateBulk,
    getTemplateByDatetime,
    getTemplatesByDatetimeCount,
    getTemplatesByStatus,
    getTemplatesByStatusCount,
    //getTemplates,
    getTemplatesCount,
    updateTemplatesStatus,
    updateTemplatesStatusBulk,
    getTemplatesByDid, downloadById
} from "@/services/MarketplaceService";
import {useDisclosure} from "@nextui-org/react";
import EditTemplatesDetailsForm from "@/app/components/forms/marketplace/EditTemplatesDetailsForm";
import {message} from "antd";

// ReviewTemplates function to display the table of templates submitted by the user
export default function ReviewTemplates() {

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

    // ----------------------- COLUMNS -------------------------
    // columns // TODO: Change the following columns according the to yours
    const columns = [
        {name: "ID", uid: "id", sortable: true, type: "text"},
        {name: "NAME", uid: "name", sortable: true, type: "text"},
        {name: "DESCRIPTION", uid: "description", sortable: false, type: "text"},
        {name: "CATEGORY", uid: "category", sortable: true, type: "text"},
        {name: "CREATED ON", uid: "submitteddate", sortable: false, type: "datetime"},
        {name: "MAIN FILE", uid: "mainfile", sortable: false, type: "buttons"},
        {name: "USERID", uid: "userid", sortable: false, type: "text"},
        {name: "MESSAGE", uid: "dmessage", sortable: false, type: "text"},
        {name: "PRICE", uid: "price", sortable: false, type: "text"},
        {name: "STATUS", uid: "status", sortable: false, type: "status"},
        {name: "ACTIONS", uid: "menu", sortable: false, type: "menu"},

    ];

    // initially visible columns // TODO: Change the following columns according the to yours
    const init_cols = [
        "name",
        "description",
        "category",
        "submitteddate",
        "mainfile",
        "dmessage",
        "devpname",
        "price",
        "status",
        "menu",
    ];

    // ----------------------- COMPONENTS -------------------------
    // components // TODO: Change the following components
    const components = {
        status: true, // status component
        columns: true, // columns component
        refresh: false, // refresh component
        bulk_actions: true, // bulk actions component
        all: true, // all components
        today: true, // today component
        yesterday: true, // yesterday component
        search: false, // search component
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
            downloadById(id).then((res) => {
                console.log(res.mainfile)

                var url = res.mainfile;

                // Open the URL in a new tab
                var newWindow = window.open(url, '_blank');

                // Initiate the file download
                var anchor = document.createElement('a');
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
        {name: "View", text: "View", icon: "", type: "primary", function: viewButton},
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
        deleteTemplate(id).then(() => {
            refreshData("success", "Deleted");
        }).catch((error) => {
            headerMessage("error", error.response.data.error);
        });

    }

    // menu buttons // TODO: Change the following buttons
    const menuButtons = [
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
            updateTemplatesStatus(id, status).then(() => {
                refreshData("success", "Updated");
            }).catch((error) => {
                headerMessage("error", error.response.data.error);
            });

        }

    // status options // TODO: Change the following options
    const statusOptions = [
        {
            name: "Pending", // status name
            uid: 0, // status id (the value in the database)
            type: "primary", // status type (color) ["", primary, secondary, danger, warning, success]
            button: false, // if you want to show a button to change the status

        },
        {
            name: "Accepted", // status name
            uid: 1, // status id (the value in the database)
            type: "success", // status type (color) [danger, warning, success, primary]
            button: false, // if you want to show a button to change the status

        },
        {
            name: "Rejected", // status name
            uid: 2, // status id (the value in the database)
            type: "danger", // status type (color) [danger, warning, success, primary]
            button: false, // if you want to show a button to change the status

        }

    ]

    // ----------------------- BULK ACTION FUNCTIONS -------------------------
    // update status bulk function
    const updateStatusBulk = (ids, status) => {

        // update status bulk function // TODO: Change the following function
        updateTemplatesStatusBulk(ids, status).then(() => {
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
        deleteTemplateBulk(ids).then(() => {
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
        getTemplatesCount(searchColumn, searchFieldValue).then((response) => setPagesCount(response));

        // fetch data from API // TODO: Change the following function
        getTemplatesByDid(rowsPerPage, currentPage, searchColumn, searchFieldValue)
            .then(response => setData(response === null ? [] : response.length === 0 ? [] : response))
            .catch(error => console.error(error));

    }

    // Fetch table data
    const fetchTableData = (useCallback((page, key, val) => {

        // fetch data count from API // TODO: Change the following function
        getTemplatesCount(key, val).then((response) => setPagesCount(response));

        // fetch data from API // TODO: Change the following function
        getTemplatesByDid(rowsPerPage, page, key, val)
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
            getTemplatesByDatetimeCount(start, end, searchColumn, searchFieldValue).then((response) => setPagesCount(response));

            // get data // TODO: Change the following function
            getTemplateByDatetime(rowsPerPage, currentPage, start, end, searchColumn, searchFieldValue).then(response => setData(response === null ? [] : response.length === 0 ? [] : response))
        }
    }


    // ----------------------- STATUS CHANGE FUNCTIONS -------------------------
    // status change function
    const statusChange = (statusArray) => {
        // get data count // TODO: Change the following function
        getTemplatesByStatusCount(statusArray, searchColumn, searchFieldValue).then((response) => setPagesCount(response));

        // get data // TODO: Change the following function
        getTemplatesByStatus(rowsPerPage, currentPage, statusArray, searchColumn, searchFieldValue).then(response => setData(response === null ? [] : response.length === 0 ? [] : response))
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
            <div className="h-screen flex items-center justify-center">
                <div className="w-full bg-secondaryDark p-4 rounded-lg shadow-md m-4">
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
                        editForm={<EditTemplatesDetailsForm refreshData={refreshData}/>}

                        // search, sorting and filtering
                        searchColumn={searchColumn}
                        sortColumn={sortColumn}
                        dateColumn={dateColumn}
                        onTimeRangeChange={onTimeRangeChange}
                        searchFieldValue={[searchFieldValue, setSearchFieldValue]}
                        changeSorting={changeSorting}

                        components={components}

                        // bulk actions
                        handleUpdateStatusBulk={handleUpdateStatusBulk}
                        handleDeleteBulk={handleDeleteBulk}

                        // pagination
                        setPage={setPage}
                        currentPage={currentPage}
                        dataCount={pagesCount}
                        rowsPerPage={rowsPerPage}
                        changeRowsPerPage={changeRowsPerPage}
                    />
                </div>
            </div>


        </>
    )
}