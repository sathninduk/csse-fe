"use client"
import {Card} from 'antd';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {useCallback, useEffect, useState} from "react";
import {
    getTotalApiSubscribersCount,
    getTotalMarketPlaceUsersCount,
    getTotalUserCount,
    getTotalWebsitesCount, UsedStorage
} from "@/services/AdminDashboardService";
import ReactECharts from "echarts-for-react";

export default function AdminDashboard() {
    const [totUsersHeader, setTotUsersHeader] = useState("Total Users");
    const [totUsers, setTotUsers] = useState(500);
    const [totSitesHeader, setTotSitesHeader] = useState("Total Sites");
    const [totSites, setTotSites] = useState(10000);
    const [totApiSubscribersHeader, setTotApiSubscribersHeader] = useState("Total API Subscribers");
    const [totApiSubscribers, setTotApiSubscribers] = useState(10);
    const [totMarketPlaceUsersHeader, setTotMarketPlaceUsersHeader] = useState("Total Marketplace Users");
    const [totMarketPlaceUsers, setTotMarketPlaceUsers] = useState(50);
    const [selectedItem1, setSelectedItem1] = useState("");
    const [selectedItem2, setSelectedItem2] = useState("");
    const [selectedItem3, setSelectedItem3] = useState("");
    const [totalUsedStorage, setTotalUsedStorage] = useState(0);
    const [totalStorage, setTotalStorage] = useState(500000);// 500GB
    const [totalStoragePerUser, setTotalStoragePerUser] = useState(2000);//2GB



    // Pie chart data
    const pieData = [
        {value: totalStorage - (totalStoragePerUser * totUsers), name: 'Free Space(MB)'},
        {value: (totalStoragePerUser * totUsers), name: 'Allocated Space(MB)'},
    ];

    const barData = [
        {data: (totalStoragePerUser * totUsers), type: 'Allocated'},
        {data: totalUsedStorage, type: 'Used'},
    ];


    // Fetching data from the API and setting the state
    const fetchTotalUsedStorage = () => {
        UsedStorage().then((data) => {
            setTotalUsedStorage(data);
        }).catch((error) => {
            console.error("Error fetching total used data:", error);
        });
    };

    const items = [
        {
            key: "totUsers",
            label: totUsersHeader,
        },
        {
            key: "totSites",
            label: totSitesHeader,
        },
        {
            key: "totApiSubscribers",
            label: totApiSubscribersHeader,
        },
        {
            key: "totMarketPlaceUsers",
            label: totMarketPlaceUsersHeader,
        }
    ];
    const cardOneHandleItemClick = (key) => {
        setSelectedItem1(key);
    };

    const cardTwoHandleItemClick = (key) => {
        setSelectedItem2(key);
    };

    const cardThreeHandleItemClick = (key) => {
        setSelectedItem3(key);
    };

    const fetchTotalCounts = useCallback(async () => {
        try {
            // Fetch total user count from API
            getTotalUserCount().then((response) => setTotUsers(response));
            getTotalWebsitesCount().then((response) => setTotSites(response));
            getTotalApiSubscribersCount().then((response) => setTotApiSubscribers(response));
            getTotalMarketPlaceUsersCount().then((response) => setTotMarketPlaceUsers(response));
        } catch (error) {
            console.error(error);
        }
    }, []);

    // useeffect to fetch data from the API every time the page is loaded
    useEffect(() => {
        fetchTotalUsedStorage();
        fetchTotalCounts().then(r => console.log(r));
    }, []);


    return (
        <div>
            <h1 className="text-2xl font-semibold mb-5">Dashboard</h1>
            <div className="flex flex-row gap-4 justify-around">
                <Card style={{width: 300}}>
                    <div>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="flat"
                                    color="primary"
                                    className="text-white, w-full"
                                >
                                    Add
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Dynamic Actions" items={items}>
                                {(item) => (
                                    <DropdownItem
                                        key={item.key}
                                        color={"primary"}
                                        onClick={() => cardOneHandleItemClick(item.key)}
                                    >
                                        {item.label}
                                    </DropdownItem>
                                )}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    {items.map((item) => (
                        <div key={item.key}>
                            {selectedItem1 === item.key ? (
                                <>
                                    <h1 className="text-2xl font-bold text-center mt-2">{item.label}</h1>
                                    <p className=" text-5xl font-bold text-center mt-2">
                                        {item.key === "totUsers" && totUsers}
                                        {item.key === "totSites" && totSites}
                                        {item.key === "totApiSubscribers" && totApiSubscribers}
                                        {item.key === "totMarketPlaceUsers" && totMarketPlaceUsers}
                                    </p>
                                </>
                            ) : null}
                        </div>
                    ))}
                </Card>

                <Card style={{width: 300}}>
                    <div>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="flat"
                                    color="primary"
                                    className="text-white, w-full"
                                >
                                    Add
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Dynamic Actions" items={items}>
                                {(item) => (
                                    <DropdownItem
                                        key={item.key}
                                        color={item.key === "delete" ? "danger" : "default"}
                                        className={item.key === "delete" ? "text-danger" : ""}
                                        onClick={() => cardTwoHandleItemClick(item.key)}
                                    >
                                        {item.label}
                                    </DropdownItem>
                                )}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    {items.map((item) => (

                        <div key={item.key}>
                            {selectedItem2 === item.key ? (
                                <>
                                    <h1 className="text-2xl font-bold text-center mt-2">{item.label}</h1>
                                    <p className=" text-5xl font-bold text-center mt-2">
                                        {item.key === "totUsers" && totUsers}
                                        {item.key === "totSites" && totSites}
                                        {item.key === "totApiSubscribers" && totApiSubscribers}
                                        {item.key === "totMarketPlaceUsers" && totMarketPlaceUsers}
                                    </p>
                                </>
                            ) : null}
                        </div>
                    ))}
                </Card>
                <Card style={{width: 300}}>
                    <div>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="flat"
                                    color="primary"
                                    className="text-white, w-full"
                                >
                                    Add
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Dynamic Actions" items={items}>
                                {(item) => (
                                    <DropdownItem
                                        key={item.key}
                                        color={item.key === "delete" ? "danger" : "default"}
                                        className={item.key === "delete" ? "text-danger" : ""}
                                        onClick={() => cardThreeHandleItemClick(item.key)}
                                    >
                                        {item.label}
                                    </DropdownItem>
                                )}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    {items.map((item) => (
                        <div key={item.key}>
                            {selectedItem3 === item.key ? (
                                <>
                                    <h1 className="text-2xl font-bold text-center mt-2">{item.label}</h1>
                                    <p className=" text-5xl font-bold text-center mt-2">
                                        {item.key === "totUsers" && totUsers}
                                        {item.key === "totSites" && totSites}
                                        {item.key === "totApiSubscribers" && totApiSubscribers}
                                        {item.key === "totMarketPlaceUsers" && totMarketPlaceUsers}
                                    </p>
                                </>
                            ) : null}
                        </div>
                    ))}
                </Card>
            </div>

            <h1 className="text-2xl font-semibold mb-5 mt-5">Storage Meters</h1>
            <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="w-full h-96">

                    <h1 className="text-xl mt-5 font-medium text-center">Overall Storage</h1>
                    <ReactECharts
                        option={{
                            tooltip: {},
                            series: [{
                                name: 'Storage',
                                type: 'pie',
                                data: pieData
                            }]
                        }}
                    />
                </div>

                <div className="w-full h-96">
                    <h1 className="text-xl mt-5 font-medium text-center">Used & Allocated Space</h1>

                    <ReactECharts
                        className="p-5"
                        option={{
                            xAxis: {
                                type: 'value'
                            },
                            yAxis: [{
                                type: 'category',
                                data: barData.map(entry => entry.type)
                            }],

                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow'
                                }
                            },
                            series: [{
                                data: barData.map(entry => entry.data),
                                type: 'bar'
                            }]
                        }}
                    />

                </div>

            </div>
        </div>

    );
}