"use client"

import React, {useEffect, useState} from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import {GetStorageByID} from "@/services/StorageService";
import {blue, yellow} from "@mui/material/colors";



// Generate initial data for the pie chart
export default function StorageMeter({params}) {
    const [storage, setStorage] = useState([
        {name: 'Remaining Storage', value: 0, color: ' purple'},
        {name: 'Used Storage', value: 0, color: 'blue'}
    ]);
    const [size, setSize] = useState(0);

    //Set remaining storage

    useEffect(() => {
        GetStorageByID(params.webId).then((response) => {
            console.log(response)
            setStorage([
                {name: 'Remaining Storage', value: 5000 , color: ' purple'},
                {name: 'Used Storage', value: response.size, color: 'blue'}
            ]);
            setSize(response.size);
        }).catch((error) => {
            console.log(error);
        });
    }, []);






    return (
        <div style={{
            textAlign: 'center',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <div>
                <h1 style={{fontSize: '2em', marginBottom: '20px'}}>Storage Overview</h1>
                <h1> Remaining Storage as of Today  <br/> TOTAL : 15GB   </h1>

                <PieChart width={600} height={400}>
                    <Pie data={storage} cx={300} cy={200} dataKey="value">

                        {storage.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color}/>
                        ))}
                    </Pie>
                </PieChart>
                <div style={{fontSize: '1.2em', marginTop: '20px'}}>
                    <div>
                        {storage[0].value - storage[1].value} bytes <span
                        style={{fontWeight: 'bold'}}> Remaining</span>
                    </div>
                    <div>
                        {storage[1].value} bytes <span style={{fontWeight: 'bold'}}> Used  </span>
                    </div>
                </div>
            </div>
        </div>
    );
}