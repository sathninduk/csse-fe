// components/Chat.js
'use client';
import React, {useEffect, useState} from 'react';

import io from 'socket.io-client';


const socket = io('http://localhost:4006');

const Chat = () => {
    const [webId, setWebId] = useState('19');
    const [visitorId, setVisitorId] = useState('866142');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('dataUpdate', (data) => {
            if (data.webId === webId && data.visitorId === visitorId) {
                setMessages(data.messages);
            }
        });

        return () => {
            socket.off('dataUpdate');
        };
    }, [webId, visitorId]);

// ...

    socket.emit('dataUpdateByVisitorId', { webId, visitorId });



    return (
        <div>
            <h2>Web ID: {webId}</h2>
            <h2>Visitor ID: {visitorId}</h2>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>
                        <strong>{message.sender}:</strong> {message.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Chat;