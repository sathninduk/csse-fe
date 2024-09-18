'use client';

import React, {useEffect} from "react";
import {
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
// import * as XLSX from 'xlsx';

import {SearchIcon} from "./icons/SearchIcon";
import {ChevronDownIcon} from "./icons/ChevronDownIcon";
import {capitalize} from "./utils/Capitalize";

export default function IconTable({
                                       data,
                                       statusOptions,
                                       columns,
                                       init_cols,
                                       updateStatus,
                                       handleUpdateStatusBulk,
                                       fetchTableData,
                                       handleUpdateScams
                                   }) {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(init_cols));
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [currentItems, setCurrentItems] = React.useState([]);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "age",
        direction: "ascending",
    });
    const [viewDate, setViewDate] = React.useState({
        startDate: Date,
        endDate: Date
    });
    const [monthSelect, setMonthSelect] = React.useState("");
    const [page, setPage] = React.useState(1);

    useEffect(() => {
        if (monthSelect.size > 0)
            handleSetViewDate("month");
        else
            handleSetViewDate("all");
    }, [monthSelect]);


    const hasSearchFilter = Boolean(filterValue);

    function redirectToImage(image) {
        window.open(`./image/deposit/${image}`, "_blank");
    }

    // export data ---------------------------
    // const exportData = () => {
    //     console.log("Exporting data...");
    //     const worksheet = XLSX.utils.json_to_sheet(filteredItems);
    //     const workbook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //     //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //     //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    //     XLSX.writeFile(workbook, "itrustld_deposit_export.xlsx");
    // }
    // export data ---------------------------

    // month list ---------------------------
    const [monthList, setMonthList] = React.useState([]);

    const convertToMonth = (month) => {
        switch (month) {
            case 1:
                return "January";
            case 2:
                return "Febuary";
            case 3:
                return "March";
            case 4:
                return "April";
            case 5:
                return "May";
            case 6:
                return "Jun";
            case 7:
                return "July";
            case 8:
                return "August";
            case 9:
                return "September";
            case 10:
                return "Octomber";
            case 11:
                return "November";
            case 12:
                return "December";
        }
    }

    useEffect(() => {
        // Get the current date
        const currentDate = new Date();
        let tempMonthList = [];

        // Loop from 1 year ago to the current month
        for (let i = 12; i > 0; i--) {
            const newDate = new Date(currentDate);

            // Subtract i months from the current date
            newDate.setMonth(currentDate.getMonth() - i + 1);

            // Format the date to "YYYY-MM" string
            const formattedDate = {
                name: `${newDate.getFullYear()} - ${convertToMonth(newDate.getMonth() + 1)}`,
                uid: `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}`
            };

            // Push the formatted date to the monthList array
            tempMonthList.push(formattedDate);
        }
        const reversedMonthList = tempMonthList.slice().reverse();
        setMonthList(reversedMonthList);
    }, []);
    // month list ---------------------------

    // datepicker
    // const [dateRangeValue, setDateRangeValue] = React.useState({
    //     startDate: Date,
    //     endDate: Date
    // });

    function isDefaultDate(date) {
        const defaultDate = new Date('Thu Jan 01 1970 05:30:00 GMT+0530 (India Standard Time)');
        return date.toDateString() === defaultDate.toDateString();
    }

    const handleValueChange = (newValue) => {
        console.log(isDefaultDate(new Date(newValue.startDate)));
        if (!isDefaultDate(new Date(newValue.startDate))) {
            setViewDate({
                startDate: new Date(newValue.startDate),
                endDate: new Date(newValue.endDate),
            });
        } else {
            setViewDate({
                startDate: Date,
                endDate: Date,
            });
        }
    }
    // datepicker

    // view date select ---------------------------
    const handleSetViewDate = (option) => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        // Set time to 00:00:00 for the start date
        const setStartTime = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);

        // Set time to 23:59:59.999 for the end date
        const setEndTime = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);

        switch (option) {
            case "all":
                setViewDate({
                    startDate: Date,
                    endDate: Date
                });
                break;
            case "today":
                setViewDate({
                    startDate: setStartTime(today),
                    endDate: setEndTime(today)
                });
                break;
            case "yesterday":
                setViewDate({
                    startDate: setStartTime(yesterday),
                    endDate: setEndTime(yesterday)
                });
                break;
            case "month":
                const selectedMonth = Array.from(monthSelect).join(", ").toString();
                const month = selectedMonth.split('-')[1];
                const year = selectedMonth.split('-')[0];
                const firstDay = new Date(year, month - 1, 1);
                const lastDay = new Date(year, month, 0);
                setViewDate({
                    startDate: setStartTime(firstDay),
                    endDate: setEndTime(lastDay)
                });
                break;
        }
    };

    // view date select ---------------------------

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredData = [...data];
        if (hasSearchFilter) {
            filteredData = filteredData.filter((data) =>
                data.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredData = filteredData.filter((data) =>
                Array.from(statusFilter).includes(data.status.toString()),
            );
        }

        if (viewDate.startDate !== Date && viewDate.endDate !== Date) {
            filteredData = filteredData.filter((data) =>
                new Date(data.up_date) >= viewDate.startDate && new Date(data.up_date) <= viewDate.endDate
            );
        }

        return filteredData;
    }, [data, filterValue, statusFilter, viewDate]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {

        setCurrentItems([]);
        setSelectedKeys(new Set([]));

        let currentItemsArray = [];
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        filteredItems.slice(start, end).forEach(function (value, key) {
            currentItemsArray.push(value.id);
        });

        setCurrentItems(currentItemsArray);

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    function copyPlatformId(cellValue) {
        setSelectedKeys(new Set([]));
        navigator.clipboard.writeText(cellValue)
            .then(() => {
                console.log("Text copied to clipboard");
            })
            .catch((err) => {
                console.error("Unable to copy text to clipboard", err);
            });
    }

    const renderCell = React.useCallback((data, columnKey) => {
        const cellValue = data[columnKey];

        switch (columnKey) {
            case "id":
                return (
                    <div>
                        <span>
                            {data.id}
                        </span>
                        <span>
                            {data.scam === 1 &&
                                <Chip color="danger" size="sm" variant="light" isIconOnly>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"/>
                                    </svg>
                                </Chip>
                            }
                        </span>
                    </div>
                );
            case "up_date":
                return (
                    <div>
                        <p className="text-bold text-small capitalize">{data.up_date.split('T')[0].split('-')[2]}/{data.up_date.split('T')[0].split('-')[1]}/{data.up_date.split('T')[0].split('-')[0]}</p>
                        <p className="text-bold text-tiny capitalize text-default-400">{data.up_date.split('T')[1].slice(0, -1).split('.')[0]}</p>
                    </div>
                );
            case "name":
                return (
                    <div>
                        {data.name}
                        {data.scam_count > 0 && <Chip color={"danger"} size={"sm"} variant={"dot"}
                                                      className={"ml-3"}>{data.scam_count}</Chip>}
                    </div>
                );
            case "cus_payment":
                return (
                    <>
                        <p className="text-bold text-tiny capitalize text-default-400">{data.cus_pay_amt_type}</p>
                        <p className="text-bold text-small capitalize">{data.cus_payment}</p>
                    </>
                );
            case "deposit_amt":
                return (
                    <>
                        <p className="text-bold text-tiny capitalize text-default-400">{data.deposit_amt_type}</p>
                        <p className="text-bold text-small capitalize">{data.deposit_amt}</p>
                    </>
                );
            case "image":
                return (
                    <div className="flex flex-col">
                        <Button isIconOnly color="default" size="sm" variant="ghost" title={"View"}
                                onClick={() => redirectToImage(data.image)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg>

                        </Button>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">

                        {data.status === 0 ?
                            <>
                                <Button color="success" isIconOnly size="sm" title={"Completed"}
                                        onClick={() => updateStatus(data.id, 1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                </Button>

                                <Button color="danger" isIconOnly size="sm" title={"Error"}
                                        onClick={() => updateStatus(data.id, 2)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
                                    </svg>
                                </Button>
                            </>
                            : data.status === 1 ?
                                <>
                                    <Button color="warning" isIconOnly size="sm" title={"Pending"}
                                            onClick={() => updateStatus(data.id, 0)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"/>
                                        </svg>
                                    </Button>

                                    <Button color="danger" isIconOnly size="sm" title={"Error"}
                                            onClick={() => updateStatus(data.id, 2)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5}
                                             stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
                                        </svg>
                                    </Button>
                                </>
                                :
                                <>
                                    <Button color="warning" isIconOnly size="sm" title={"Pending"}
                                            onClick={() => updateStatus(data.id, 0)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"/>
                                        </svg>
                                    </Button>

                                    <Button color="success" isIconOnly size="sm" title={"Completed"}
                                            onClick={() => updateStatus(data.id, 1)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5}
                                             stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                    </Button>
                                </>
                        }

                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize"
                          color={cellValue === 0 ? "warning" : cellValue === 1 ? "success" : "danger"} size="sm"
                          variant="flat">
                        {
                            cellValue === 0 ? "Pending" : cellValue === 1 ? "Completed" : "Error"
                        }
                    </Chip>
                );
            case "platform_credi":
                return (
                    <Button size={"sm"} onClick={() => copyPlatformId(cellValue)}
                            className={"cursor-pointer active:dark:bg-zinc-900"}
                            style={{transitionDuration: ".3s", borderRadius: "30px"}} title={"Copy"}>
                        {cellValue}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-4 h-4 inline-block">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"/>
                        </svg>
                    </Button>
                );
            default:
                return cellValue;
        }
    }, []);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    // rows select for action handle
    useEffect(() => {

        console.log(selectedKeys);

        const bulkElements = document.getElementsByClassName("bulkActions");

        if (selectedKeys.size > 0 || selectedKeys === "all") {
            Array.from(bulkElements).forEach((element) => {
                element.style.display = "inline-flex";
            });
        } else {
            Array.from(bulkElements).forEach((element) => {
                element.style.display = "none";
            });
        }
    }, [selectedKeys]);

    // update status bulk


    const topContent = React.useMemo(() => {
        return (
            <>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between gap-3 items-end">
                        <div className="flex gap-3">
                            <Dropdown className={"z-10"}>
                                <DropdownTrigger className="hidden sm:flex">
                                    <Button endContent={<ChevronDownIcon className="text-small"/>} variant="flat">
                                        Status
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    disallowEmptySelection
                                    aria-label="Table Columns"
                                    closeOnSelect={false}
                                    selectedKeys={statusFilter}
                                    selectionMode="multiple"
                                    onSelectionChange={setStatusFilter}
                                >
                                    {statusOptions.map((status) => (
                                        <DropdownItem key={status.uid} className="capitalize">
                                            {capitalize(status.name)}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                            <Dropdown>
                                <DropdownTrigger className="hidden sm:flex">
                                    <Button endContent={<ChevronDownIcon className="text-small"/>} variant="flat">
                                        Columns
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    disallowEmptySelection
                                    aria-label="Table Columns"
                                    closeOnSelect={false}
                                    selectedKeys={visibleColumns}
                                    selectionMode="multiple"
                                    onSelectionChange={setVisibleColumns}
                                >
                                    {columns.map((column) => (
                                        <DropdownItem key={column.uid} className="capitalize">
                                            {capitalize(column.name)}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                            <Button variant={"ghost"} onClick={fetchTableData}>Refresh</Button>

                            {selectedKeys.size > 0 || selectedKeys === "all" ?
                                <>
                                    <Button color="success" size="sm" title={"Completed"}
                                            onClick={() => handleUpdateStatusBulk(selectedKeys, 1, currentItems)}>
                                        Completed
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5}
                                             stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                    </Button>

                                    <Button color="danger" size="sm" title={"Error"}
                                            onClick={() => handleUpdateStatusBulk(selectedKeys, 2, currentItems)}>
                                        Error
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5}
                                             stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
                                        </svg>
                                    </Button>

                                    <Button color="warning" size="sm" title={"Pending"}
                                            onClick={() => handleUpdateStatusBulk(selectedKeys, 0, currentItems)}>
                                        Pending
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"/>
                                        </svg>
                                    </Button>

                                    <Button color="danger" size="sm" variant={"faded"} title={"Pending"}
                                            onClick={() => handleUpdateScams(selectedKeys, 1, currentItems)}>
                                        Report
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"/>
                                        </svg>
                                    </Button>
                                </> : null
                            }

                            {/*<Button color="primary" endContent={<PlusIcon/>}>
                            Add New
                        </Button>*/}
                        </div>
                        <div className="flex gap-3">
                            {/*<Button onClick={() => handleSetViewDate("all")}>All</Button>*/}
                            <Button onClick={() => handleSetViewDate("today")}>Today</Button>
                            <Button onClick={() => handleSetViewDate("yesterday")}>Yesterday</Button>
                            <Dropdown>
                                <DropdownTrigger className="hidden sm:flex">
                                    <Button endContent={<ChevronDownIcon className="text-small"/>} variant="flat">
                                        Monthly
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    // disallowEmptySelection
                                    aria-label="Table Columns"
                                    closeOnSelect={false}
                                    selectionMode="single"
                                    onSelectionChange={setMonthSelect}
                                >
                                    {monthList.map((column) => (
                                        <DropdownItem key={column.uid} className="capitalize">
                                            {capitalize(column.name)}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between gap-3 items-end">
                        <Input
                            isClearable
                            className="w-full sm:max-w-[44%]"
                            placeholder="Search by name..."
                            startContent={<SearchIcon/>}
                            value={filterValue}
                            onClear={() => onClear()}
                            onValueChange={onSearchChange}
                        />
                        {/*<div className="flex gap-3 w-4/12">*/}
                        {/*    <Datepicker*/}
                        {/*        placeholder={"Select date range"}*/}
                        {/*        id={"dataPicker"}*/}
                        {/*        value={viewDate}*/}
                        {/*        onChange={handleValueChange}*/}
                        {/*        showShortcuts={false}*/}
                        {/*    />*/}
                        {/*    <Button className={"md:block hidden"} onClick={exportData}>Export</Button>*/}
                        {/*</div>*/}
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-default-400 text-small">Total {data.length} data</span>
                        <label className="flex items-center text-default-400 text-small">
                            Rows per page:
                            <select
                                className="bg-transparent outline-none text-default-400 text-small"
                                onChange={onRowsPerPageChange}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </label>
                    </div>
                </div>
            </>
        );
    }, [
        monthList,
        viewDate,
        selectedKeys,
        handleUpdateStatusBulk,
        filterValue,
        statusFilter,
        visibleColumns,
        onRowsPerPageChange,
        data.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
              ? "All items selected"
              : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                    className={"z-0"}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [filteredItems, selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[382px]",
            }}
            className={"light dark:dark"}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No data found"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
