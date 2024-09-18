import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { GetLastMessage } from "@/services/MessageService";
import useSocket from 'socket.io-client'
import Keys from '@/Keys'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

const VisitorName = ({ visitorName }) => (
    <div fontWeight="bold" fontSize="15px" mr={10}>
        {visitorName}
    </div>
);

const LastMessage = styled.div`
    flex: 1;
    font-size: 12px;
`;

const ChatListItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid #ddd;

    &:hover {
        background-color: #7b8186;
    }
`;

const ChatList = ({ chats, onChatClick, webId }) => {
    const [lastMessages, setLastMessages] = useState({});
    const socket = useSocket(Keys.MESSAGE_SERVICE_API_URL); // Replace with your server URL
    const [searchInput, setSearchInput] = useState('');
    const [sortedChats, setSortedChats] = useState([]);

    // Fetch last messages on component mount and listen for updates
    useEffect(() => {
        const timer = setTimeout(() => {
            const fetchLastMessages = async () => {
                const lastMessagesData = {};
                for (const chat of chats) {
                    try {
                        lastMessagesData[chat.visitorId] = await GetLastMessage(webId, chat.visitorId);
                    } catch (error) {
                        console.error(`Error fetching last message for visitor ${chat.visitorId}:`, error);
                    }
                }
                setLastMessages(lastMessagesData);
                const sortedChats = chats.sort((a, b) => {
                    const lastMessageA = lastMessagesData[a.visitorId];
                    const lastMessageB = lastMessagesData[b.visitorId];
                    if (!lastMessageA ||!lastMessageB) return 0;
                    const timeA = new Date(lastMessageA.time);
                    const timeB = new Date(lastMessageB.time);
                    return timeB - timeA;
                });
                setSortedChats(sortedChats);
            };

            fetchLastMessages();

        }, 1000); // Adjust delay time as needed

        // Clear the timer on component unmount
        return () => clearTimeout(timer);
    }, [chats, webId, socket]);

    // Handle search input change
    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    // Filter chats based on search input
    const filteredChats = sortedChats.filter((chat) =>
        chat.visitorName.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div>
            <div style={{
                position: 'sticky',
                top: '0',
                zIndex: 1,
                backgroundColor: '#0f100f',
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #ddd',
                borderBottom: '1px solid #ddd',
                borderLeft: '1px solid #ddd',
                borderRight: '1px solid #ddd',
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    style={{
                        backgroundColor: '#0f100f',
                        padding: '0px 20px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        outline: 'none',
                    }}
                />

            </div>
            {filteredChats.map((chat) => (
                <ChatListItem
                    key={chat.visitorId}
                    id={chat.visitorId}
                    onClick={() => onChatClick(webId, chat.visitorId, chat.visitorName)}
                >
                    <VisitorName visitorName={chat.visitorName}/>
                    <LastMessage>{lastMessages[chat.visitorId]?.message}</LastMessage>
                </ChatListItem>
            ))}
        </div>
    );
};
export default ChatList;