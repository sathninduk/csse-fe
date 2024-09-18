"use client"
import React, { useEffect, useState } from "react";
import CardTbl from "@/app/components/Analytics/CardTbl";
import { Divider, Table } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useParams } from "next/navigation";
import {
    getTraffic,
    visitorSource,
    visitorCountry,
    visitorDevice
} from "@/services/AnalyticsDashbordService";


const dataSource = [
    {
        key: '1',
        country: 'USA',
        UserCount: 500,
        Percentage: 25,
    },
    {
        key: '2',
        country: 'UK',
        UserCount: 700,
        Percentage: 35,
    },
    {
        key: '3',
        country: 'India',
        UserCount: 400,
        Percentage: 20,
    },
    {
        key: '4',
        country: 'Australia',
        UserCount: 500,
        Percentage: 25,
    },
];
const columns = [
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
    },
    {
        title: 'Count',
        dataIndex: 'UserCount',
        key: 'UserCount',
    },

];


export default function Analytics() {
    const [userCountByCountry, setUserCountByCountry] = useState([]);
    const [websiteTrafficData, setWebsiteTrafficData] = useState([]);
    const [visitorSourceData, setVisitorSourceData] = useState([]);
    const [visitorDeviceData, setVisitorDeviceData] = useState([]);
    const { webId } = useParams();

    useEffect(() => {
        const interval = setInterval(() => {
            fetchUserCountByCountry();
            fetchTraffic();
            fetchVisitorSourceData();
            fetchVisitorDeviceData();
        }, 10000); // Refresh every 10 seconds
    
        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);
    


    const fetchUserCountByCountry = () => {
        visitorCountry(webId)
            .then((data) => {
                // Map the API response to match the dataSource structure
                const mappedData = data.map((entry, index) => ({
                    key: String(index + 1), // Assuming key should be unique
                    country: entry.country_code, // Change this to match your API response key
                    UserCount: entry.user_count // Change this to match your API response key
                }));
                setUserCountByCountry(mappedData);
            })
            .catch((error) => {
                console.error("Error fetching country data:", error);
            });
    };

    const fetchTraffic = () => {
        getTraffic(webId)
            .then((data) => {
                // Initialize arrays to hold session counts for each day of the week
                const sessionCountsByDay = [0, 0, 0, 0, 0, 0, 0]; // Initialize all days with 0 session count
    
                // Populate session counts for the corresponding days
                data.forEach(entry => {
                    // Adjust the index based on the day of the week (0 for Monday, 6 for Sunday)
                    const index = entry.day_of_week === 0 ? 6 : entry.day_of_week - 1;
                    sessionCountsByDay[index] = entry.session_count;
                });
    
                // Update the state with the formatted data
                setWebsiteTrafficData(sessionCountsByDay);
            })
            .catch((error) => {
                console.error("Error fetching website traffic data:", error);
            });
    };
    
    


    // Function to convert day number to day name
    const getDayOfWeek = (dayNumber) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[dayNumber];
    };


    const fetchVisitorSourceData = () => {
        visitorSource(webId).then((data) => {
            setVisitorSourceData(data.map(entry => ({
                value: entry.user_count,
                name: entry.user_source
            })));
        }).catch((error) => {
            console.error("Error fetching visitor source data:", error);
        });
    };

    const fetchVisitorDeviceData = () => {
        visitorDevice(webId).then((data) => {
            setVisitorDeviceData(data.map(entry => ({
                data: entry.device_count,
                type: entry.device_name
            })));
        }).catch((error) => {
            console.error("Error fetching visitor device data:", error);
        });
    };


    return (
        <div>
            {/* desgign h1 for header as website traffic */}
            <div className="grid grid-cols-2 grid-rows-2">
                <div className="w-full overflow-auto h-96 ">

                    <h1 className="text-medium mt-5 font-bold text-center">Cognitive Complexity Trends</h1>

                    <ReactECharts
                        option={{
                            xAxis: {
                                type: 'category',
                                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'] // All seven days of the week
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                data: websiteTrafficData, // Use the session counts for each day
                                type: 'bar'
                            }]
                        }}
                    />



                </div>
                {/* chart about visitors source facebook,whatsapp,instagrame,direct visit in pie chart */}
                <div className="w-full h-96 border-l-1">

                    <h1 className="text-medium mt-5 font-bold text-center">Current Complexity</h1>
                    <ReactECharts
                        option={{
                            tooltip: {},
                            series: [{
                                name: 'User Source',
                                type: 'pie',
                                data: visitorSourceData
                            }]
                        }}
                    />




                </div>
                {/*visitor country table*/}
                <div className="w-full h-96 border-1 overflow-scroll">
                    <h1 className="text-medium mt-5 font-bold text-center pb-6">Formal Specification Logs</h1>
                    <Table dataSource={userCountByCountry} columns={columns} />;


                </div>

                {/* visitor devices data horizonal grph */}
                <div className="w-full h-96 border-1">
                    <h1 className="text-medium mt-5 font-bold text-center">Formal Specification Alerts</h1>

                    <ReactECharts
                        className="p-5"
                        option={{
                            xAxis: {
                                type: 'value'
                            },
                            yAxis: [{
                                type: 'category',
                                data: visitorDeviceData.map(entry => entry.type)
                            }],

                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow'
                                }
                            },
                            series: [{
                                data: visitorDeviceData.map(entry => entry.data),
                                type: 'bar'
                            }]
                        }}
                    />

                </div>

            </div>
        </div>
    );
}