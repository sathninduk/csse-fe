'use client';

import React, {useEffect} from "react";
import {
    Avatar,
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Pagination,
    Table as NextUITable,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    User
} from "@nextui-org/react";
import {DatePicker, message} from 'antd';
import {SearchIcon} from "./icons/SearchIcon";
import {ChevronDownIcon} from "./icons/ChevronDownIcon";
import {capitalize} from "./utils/Capitalize";
import {VerticalDotsIcon} from "@/app/components/icons/VerticalDotsIcon";
import Model from "@/app/components/Model";
import {download, generateCsv, mkConfig} from "export-to-csv";

const {RangePicker} = DatePicker;


export default function Table({data, columns, init_cols, ...props}) {

    // states
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(init_cols));
    const [statusFilter, setStatusFilter] = React.useState(["all"]);
    const [sortDescriptor, setSortDescriptor] = React.useState(props.sortColumn);
    const [rangeStart, setRangeStart] = React.useState(null);
    const [rangeEnd, setRangeEnd] = React.useState(null);
    const [editItemId, setEditItemId] = React.useState(null);
    const [messageApi, contextHolder] = message.useMessage();
    const page = props.currentPage;
    const pages = Math.ceil(props.dataCount / props.rowsPerPage);


    // csv config
    const csvConfig = mkConfig({useKeysAsHeaders: true});

    // export data
    const exportData = () => {
        const csv = generateCsv(csvConfig)(data);
        download(csvConfig)(csv);
    }

    // header column visibility
    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;
        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [columns, visibleColumns]);

    // get cell values
    const renderCell = React.useCallback((data, columnKey) => {

        // get cell value by column key
        const cellValue = data[columnKey];

        // copy text to clipboard
        const copyText = (cellValue) => {
            setSelectedKeys(new Set([]));
            navigator.clipboard.writeText(cellValue)
                .then(() => {
                    messageApi.open({
                        type: 'success',
                        content: 'Text copied to clipboard',
                    }).then(r => console.log(r));
                })
                .catch((err) => {
                    console.error("Unable to copy text to clipboard", err);
                    messageApi.open({
                        type: 'error',
                        content: 'Unable to copy text to clipboard',
                    }).then(r => console.log(r));
                });
        }

        // get column type by uid
        const getTypeByUid = (uid) => {
            const column = columns.find(col => col.uid === uid);
            return column ? column.type : "text";
        }

        // column type selector
        switch (getTypeByUid(columnKey)) {
            case "text":
                return (
                    <p>{cellValue}</p>
                );
            case "twoText":
                return (
                    <>
                        <p className="text-bold text-small capitalize">{cellValue && cellValue.split("\n")[0]}</p>
                        <p className="text-bold text-tiny capitalize text-default-400">{cellValue && cellValue.split("\n")[1]}</p>
                    </>
                );
            case "datetime":
                return (
                    <div>
                        <p className="text-bold text-small capitalize">{cellValue && cellValue.split('T')[0].split('-')[2]}/{cellValue && cellValue.split('T')[0].split('-')[1]}/{cellValue && cellValue.split('T')[0].split('-')[0]}</p>
                        <p className="text-bold text-tiny capitalize text-default-400">{cellValue && cellValue.split('T')[1].slice(0, -1).split('.')[0]}</p>
                    </div>
                );
            case "label":
                return (
                    <Chip className="capitalize" color={"primary"} size="sm" variant="flat">{cellValue}</Chip>
                );
            case "status":
                return (
                    (props.statusOptions && props.statusOptions.find((status) => status.uid === cellValue)) &&
                    <Chip className="capitalize"
                          color={props.statusOptions.find((status) => status.uid === cellValue).type} size="sm"
                          variant="flat">{props.statusOptions.find((status) => status.uid === cellValue).name}
                    </Chip>
                );
            case "statusButtons":
                return (
                    props.statusOptions &&
                    <div className="relative flex justify-normal items-center gap-2">
                        {props.statusOptions.map((statusButton, index) => (
                            (statusButton.currentStatus.includes(data.status) && statusButton.button) &&
                            <Button key={index} color={statusButton.type} size="sm" title={statusButton.name} isIconOnly
                                    onClick={() => statusButton.function(data.id, statusButton.uid)} variant="flat">
                                {statusButton.icon}
                            </Button>
                        ))}
                    </div>
                );
            case "buttons":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        {props.actionButtons.map((actionButton, index) => (
                            <Button key={index} color={actionButton.type} size="sm"
                                    title={actionButton.name} // isIconOnly
                                    onPress={() => actionButton.function(data.id)} variant="flat">
                                {actionButton.icon}{actionButton.text}
                            </Button>
                        ))}
                    </div>
                );
            case "menu":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <VerticalDotsIcon className="text-default-300"/>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                {props.menuButtons && props.menuButtons.map((menuButton, index) => (
                                    <DropdownItem key={index} onClick={() => {
                                        menuButton.function(data.id);
                                        setEditItemId(data.id);
                                    }}>{menuButton.name}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            case "copy":
                return (
                    <Button size={"sm"} onClick={() => copyText(cellValue)}
                            className={"cursor-pointer active:dark:bg-zinc-900"}
                            style={{transitionDuration: ".3s", borderRadius: "30px"}} title={"Copy"}>
                        {cellValue}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-4 h-4 inline-block">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"/>
                        </svg>
                    </Button>
                )
            case "icon":
                return (
                    <Avatar radius="sm" src={cellValue}/>
                )
            case "iconText":
                return (
                    <User
                        avatarProps={{radius: "lg", src: cellValue && cellValue.split("\n")[0]}}
                        name={cellValue && cellValue.split("\n")[1]}
                        description={cellValue && cellValue.split("\n")[2]}
                    />
                )
            default:
                return cellValue;
        }
    }, [columns, messageApi, props.actionButtons, props.menuButtons, props.statusOptions]);

    // next page handler
    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            props.setPage(page + 1);
        }
    }, [page, pages, props]);

    // previous page handler
    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            props.setPage(page - 1);
        }
    }, [page, props]);

    // search clear filter value
    const onClear = React.useCallback(() => {
        props.fetchTableData(page, "", "")
        props.setPage(1)
    }, [props])

    // sort data
    useEffect(() => {
        props.changeSorting(sortDescriptor);
    }, [props, sortDescriptor]);

    useEffect(() => {
        if (statusFilter[0] !== 'all') {
            // convert statusFilter to an array
            const statusFilterArray = Array.from(statusFilter);
            props.statusChange(statusFilterArray);
        }
    }, [statusFilter]);

    // trigger search
    const triggerSearch = () => {
        setRangeStart(null);
        setRangeEnd(null);
        props.fetchTableData(page, props.searchColumn, props.searchFieldValue[0]);
    }

    const handleDateRangeValueChange = (newValue) => {

        setRangeStart(newValue ? newValue[0] : null);
        setRangeEnd(newValue ? newValue[1] : null);

        newValue ? props.onTimeRangeChange(
                new Date(newValue[0]).toISOString().replace('T', ' ').replace('Z', ''),
                new Date(newValue[1]).toISOString().replace('T', ' ').replace('Z', ''))
            :
            props.onTimeRangeChange(null, null);
    }


    // top content
    const topContent = React.useMemo(() => {

        return (
            <>
                <Model editItemId={editItemId} modelForm={props.editForm} title={"Edit Details"} button={"Edit"}
                       buttonFunction={props.editMenuButton} isOpen={props.editItemIsOpen}
                       onOpenChange={props.editItemOnOpenChange}/>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between gap-3 items-end">
                        <div className="flex gap-3">

                            {/* status */}
                            {props.components && props.components.status &&
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
                                        selectionMode="single"
                                        onSelectionChange={setStatusFilter}
                                    >
                                        <DropdownItem key={"all"} className="capitalize">
                                            All
                                        </DropdownItem>
                                        {props.statusOptions && props.statusOptions.map((status) => (
                                            <DropdownItem key={status.uid} className="capitalize">
                                                {capitalize(status.name)}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            }

                            {/* columns */}
                            {props.components && props.components.columns &&
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
                                            column.name !== "" &&
                                            <DropdownItem key={column.uid} className="capitalize">
                                                {capitalize(column.name)}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            }

                            {/* refresh */}
                            {props.components && props.components.refresh &&
                                <Button variant={"ghost"}
                                        onClick={() => props.fetchTableData(page, props.searchColumn, props.searchFieldValue[0])}>Refresh</Button>
                            }
                        </div>

                        {/* bulk actions */}
                        {props.components && props.components.bulk_actions &&
                            <div className="flex gap-3">
                                {selectedKeys.size > 0 || selectedKeys === "all" ?
                                    <>
                                        {/* update status */}
                                        {(props.statusOptions && props.statusOptions.length > 0) && props.statusOptions.map((statusButton, index) => (
                                            statusButton.button &&
                                            <Button key={index} color={statusButton.type} size="sm" variant={"flat"}
                                                    title={statusButton.name} isIconOnly
                                                    onClick={() => {
                                                        props.handleUpdateStatusBulk(selectedKeys, statusButton.uid);
                                                    }}>{statusButton.icon}
                                            </Button>
                                        ))}

                                        {/* remove */}
                                        <Button color="danger" variant={"light"} size="sm" title={"Remove"} isIconOnly
                                                onClick={() => {
                                                    props.handleDeleteBulk(selectedKeys, 0);
                                                }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                            </svg>

                                        </Button>
                                    </> : null
                                }
                                {props.components && props.components.all &&
                                    <Button onClick={() => {
                                        props.onTimeRangeChange(null, null);
                                        setRangeStart(null);
                                        setRangeEnd(null);
                                    }}>All</Button>}
                                {props.components && props.components.today &&
                                    <Button
                                        onClick={() => {
                                            props.onTimeRangeChange(new Date(new Date().setHours(0, 0, 0, 0)).toISOString().replace('T', ' ').replace('Z', ''), new Date(new Date().setHours(23, 59, 59, 999)).toISOString().replace('T', ' ').replace('Z', ''));
                                            setRangeStart(null);
                                            setRangeEnd(null);
                                        }}>Today</Button>}
                                {props.components && props.components.yesterday &&
                                    <Button
                                        onClick={() => {
                                            props.onTimeRangeChange(new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0, 0, 0, 0)).toISOString().replace('T', ' ').replace('Z', ''), new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(23, 59, 59, 999)).toISOString().replace('T', ' ').replace('Z', ''));
                                            setRangeStart(null);
                                            setRangeEnd(null);
                                        }}>Yesterday</Button>}
                            </div>
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between gap-3 items-end">
                        {props.components && props.components.search &&
                            <div className={"w-full sm:max-w-[44%]"}>
                                <Input
                                    isClearable
                                    className="w-3/5 md:w-full sm:max-w-[65%] inline-block"
                                    placeholder={`Search by ${props.searchColumn.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, char => char.toLowerCase())}...`}
                                    startContent={<SearchIcon/>}
                                    variant={"faded"}
                                    onClear={() => onClear()}
                                    value={props.searchFieldValue[0]}
                                    onValueChange={props.searchFieldValue[1]}
                                    classNames={{
                                        inputWrapper: "bg-dark border-none h-6 rounded-lg"
                                    }}
                                />
                                <div className={"inline-block ml-1"}>
                                    <Button color="primary" variant={"flat"} onPress={triggerSearch} className={"w-1/5 md:w-full h-10"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                                        </svg>
                                        Search
                                    </Button>
                                </div>
                            </div>
                        }
                        <div className={`flex gap-3${props.components && props.components.date_range && ' w-4/12'}`}>
                            {props.components && props.components.date_range &&
                                <RangePicker onChange={handleDateRangeValueChange} value={[rangeStart, rangeEnd]}/>}
                            {props.components && props.components.export &&
                                <Button className={"md:block hidden"} onClick={exportData}>Export</Button>}
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-default-400 text-small">Total {props.dataCount} data</span>
                        <label className="flex items-center text-default-400 text-small">
                            Rows per page:
                            <select
                                className="bg-transparent outline-none text-default-400 text-small"
                                onChange={() => props.changeRowsPerPage(event.target.value)}
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                            </select>
                        </label>
                    </div>
                </div>
            </>
        );
    }, [statusFilter, props, visibleColumns, columns, selectedKeys, onClear]);

    // bottom content
    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
              ? `${props.rowsPerPage} of ${props.dataCount} selected`
              : `${selectedKeys.size} of ${props.dataCount} selected`}
        </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow={false}
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={props.setPage}
                    className={"z-0"}
                    loop={true}
                    classNames={{
                        item: "w-auto pr-4 pl-4 bg-dark",
                        cursor: "w-auto pr-3 pl-3",
                        prev: "bg-dark",
                        next: "bg-dark"
                    }}
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
    }, [selectedKeys, props.dataCount, props.setPage, page, pages, onPreviousPage, onNextPage]);

    // return table
    return (
        <>
            {contextHolder} {/* notification message */}

            {/* Table */}
            <NextUITable
                aria-label="Table"
                isHeaderSticky
                topContent={topContent}
                topContentPlacement="outside"
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                classNames={{
                    wrapper: "max-h-[382px]",
                    sortIcon: "hidden",
                }}
                className={"dark:dark"}
                selectedKeys={selectedKeys}
                selectionMode={props.selectionMode && props.selectionMode || "multiple"}
                onSelectionChange={setSelectedKeys}
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
            >
                {/* Table header */}
                <TableHeader columns={headerColumns}>

                    {/* Table column */}
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

                {/* Table body */}
                <TableBody emptyContent={"No data found"} items={data}>

                    {/* Table row */}
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}

                </TableBody>

            </NextUITable>
        </>
    );
}