"use client"

import {useEffect, useState} from 'react';
import React from "react";
import Input from "@/app/components/Input";
import {Button, Card} from "@nextui-org/react";
import { jwtDecode } from "jwt-decode"
import {
    deleteApiKey,
    getApiKey,
    subscribeApiKey,
    updateApiKey
} from "@/services/ApiSubscriberService";



export default function apiSubscribe() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [clientId, setClientId] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [apiKey, setApiKey] = useState("");

    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const uid = decoded.id;
    console.log(decoded);
    console.log(uid);

    const fetchData = () => {
        getApiKey(uid).then((data) => {
            setClientId(data.client_id);
            setApiKey(data.key);
        }).catch((error) => {
            console.error("Error: ", error);
        });
    };

    const subscribe = () => {
        subscribeApiKey(uid).then((data) => {
            setClientId(data.client_id);
            setApiKey(data.key);
        }).catch((error) => {
            console.error("Error: ", error);
        });
    };

    const regenerate = () => {
        updateApiKey(uid).then((data) => {
            setClientId(data.client_id);
            setApiKey(data.key);
        }).catch((error) => {
            console.error("Error: ", error);
        });
    };

    const deleteSubscription = () => {
        deleteApiKey(uid).then((data) => {
            if(data){
                setClientId("");
                setApiKey("");
            }
        }).catch((error) => {
            console.error("Error: ", error);
        });
    };


    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        fetchData(); // Fetch data on initial page load
    }, []);


    return(
        <div className="w-full h-screen flex items-center justify-center">

            <Card className="dark:bg-secondaryDark w-3/4 p-5 ml-auto mr-auto flex-col items-center flex ">
                {!clientId && !apiKey ? (
                    <Button
                        variant="flat"
                        color="primary"
                        size="lg"
                        onClick={subscribe}>
                        Subscribe to API
                    </Button>
                ) : (
                    <div className="w-full p-2 md:p-10 flex-col items-center">
                        <h4 className="text-white text-lg pb-1 pl-1">Client ID</h4>
                        <Input
                            hiddenLabel
                            id="clientID"
                            className="mb-5 w-full rounded-lg"
                            variant="filled"
                            InputProps={{
                                readOnly: true,
                            }}
                            value={clientId}
                        />
                        <h4 className="text-white text-lg pb-1 pl-1">API Key</h4>
                        <Input
                            hiddenLabel
                            id="apiKey"
                            className="mb-5 w-full rounded-lg"
                            variant="filled"
                            InputProps={{
                                readOnly: true,
                            }}
                            value={apiKey}
                        />

                        <div className="flex flex-col md:flex-row justify-between gap-5 md:mt-5">
                            <Button
                                variant="flat"
                                color="success"
                                size="lg"
                                onClick={regenerate}
                                className="w-full">
                                Regenerate
                            </Button>

                            <Button
                                name="Delete"
                                variant="flat"
                                color="danger"
                                size="lg"
                                onClick={deleteSubscription}
                                className="w-full">
                                Delete
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}