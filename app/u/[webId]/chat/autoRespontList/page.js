'use client';
import React, { useState, useEffect } from 'react';
import { GetAutoRespondsByWebID } from "@/services/AutoRespondService";

const AutoRespondsList = ({ onMessageClick, webId }) => {
    const [autoResponds, setAutoResponds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    //fetch responds in catch webId
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const fetchedAutoResponds = await GetAutoRespondsByWebID(webId);
                setAutoResponds(fetchedAutoResponds);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (webId) {
            fetchData();
        }
    }, [webId]);

    //check if loading
    if (isLoading) {
        return <p style={{ color: 'black' }}>Loading auto-responds...</p>;
    }
    //check error
    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }
    //check is messages are in
    if (!autoResponds.length) {
        return <p style={{ color: 'black' }}>No auto-responds found.</p>;
    }

    return (
        <ul>
            {autoResponds
                .filter((autoRespond) => autoRespond.status === 1)
                .map((autoRespond) => (
                    <li key={autoRespond.id} onClick={() => onMessageClick(autoRespond.message)}>
                        <p style={{ color: 'black' }}>Message: {autoRespond.message}</p>
                    </li>
                ))}
        </ul>
    );
};

export default AutoRespondsList;