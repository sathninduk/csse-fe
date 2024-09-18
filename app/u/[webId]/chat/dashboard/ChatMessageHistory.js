import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { AddMessage, GetMessagesByVisitorId } from "@/services/MessageService";
import useSocket from 'socket.io-client'
import Keys from '@/Keys'
import AutoRespondsList from "@/app/u/[webId]/chat/autoRespontList/page";
import { faNoteSticky, faPaperPlane, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const ChatMessageHistory = ({content, visitorId }) => {
    const socket = useSocket(Keys.MESSAGE_SERVICE_API_URL)
    const [message, setMessage] = useState('')// Set message state to an empty string
    const [messages, setMessages] = useState([])// Set messages state to an empty array
    const [isAutoRespondsOpen, setIsAutoRespondsOpen] = useState(false)// Set auto-responds list state to false
    const { webId } = useParams()
    const [isLoading, setIsLoading] = useState(true)// Set loading state to true


    // Handle message input change
    const handleMessageChange = (event) => {
        setMessage(event.target.value)
    }

    //fetch  messages for given visitorId
    useEffect(() => {
        const timer = setTimeout(() => {
        const fetchMessages = async () => {
            const lastMessages = await GetMessagesByVisitorId({ webId, visitorId: visitorId });
            setMessages(lastMessages);
            setMessages(lastMessages);
            setIsLoading(false); // Set loading state to false
        };

        fetchMessages();
    }, 1000); // Adjust delay time as needed

    // Clear the timer on component unmount
    return () => clearTimeout(timer);

    }, [webId, socket, visitorId]);

    // Send a message to the server
    const sendMessage = async () => {
        const visitorName = content.find(msg => msg.visitorId === visitorId)?.visitorName;
        const data = {
            visitorId: visitorId,
            visitorName: visitorName,
            sender: 'websiteOwner',
            message: message,
            time: new Date().toISOString(),
        }

        const response = await AddMessage({ webId }, data);
        const messages = await GetMessagesByVisitorId({ webId, visitorId });

        // Update the messages state with the autoRespontList message
        setMessages(messages)
        console.log(messages);
        // Emit a 'newMessage' event to the server
        socket.emit('newMessage', response)

        setMessage('')
    }

    // Toggle the auto-responds list
    const toggleAutoRespondsList = () => {
        setIsAutoRespondsOpen(!isAutoRespondsOpen);
    };

    // Handle auto-respond click
    const handleAutoRespondClick = (message) => {
        setMessage(message);
        setIsAutoRespondsOpen(false);
    };



    return (
        <>
            <div style={{height: '550px', overflowY: 'scroll'}}>
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
                    boxShadow: '0 2px 4px rgba(0.1, 0.1, 0.1, 0.1)',
                }}>

                    <div style={{color: 'white', fontSize: '17px'}}>
                        {content.find(msg => msg.visitorId === visitorId)?.visitorName}
                    </div>
                </div>
                {isLoading? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <FontAwesomeIcon icon={faSpinner} size="2x" spin />
                        Loading messages...
                    </div>
                ) : (

                <div>
                    {messages.sort((a, b) => new Date(a.time) - new Date(b.time)).map((msg, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            flexDirection: msg.sender === 'websiteOwner' ? 'row-reverse' : 'row',
                            alignItems: 'center',
                            justifyContent: 'pace-between',
                            marginTop: '10px'
                        }}>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <div style={{
                                    backgroundColor: msg.sender === 'websiteOwner' ? '#004a77' : '#7b8186',
                                    color: 'white',
                                    padding: '5px 10px',
                                    borderRadius: '10px',
                                    // Add marginRight for the sender's messages and marginLeft for the admin's messages
                                    marginRight: msg.sender === 'websiteOwner' ? '10px' : 0,
                                    marginLeft: msg.sender === 'visitor' ? '10px' : 0,
                                    alignSelf: 'flex-start'
                                }}>
                                    {msg.message}
                                </div>
                                <div style={{
                                    fontSize: '15px',
                                    fontcolor: '#0f100f',
                                    color: '#666',
                                    alignSelf: 'flex-start',
                                    marginTop: '5px'
                                }}>
                                    {new Date(msg.time).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            </div>
            <div
                style={{

                    bottom: '0',
                    left: '0',
                    right: '0',
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#0f100f',
                    borderTop: '1px solid #ddd',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
            >
                <input
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Type a message..."
                    style={{
                        flexGrow: 1,
                        padding: '10px',
                        backgroundColor: '#0f100f',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        marginRight: '10px',
                    }}
                />
                <div onClick={sendMessage} style={{marginRight: '20px'}}><FontAwesomeIcon icon={faPaperPlane} size="1x" color="white"/></div>
                <div onClick={toggleAutoRespondsList}  style={{marginRight: '20px'}}><FontAwesomeIcon icon={faNoteSticky} size="1x" color="white"/>
                </div>

            </div>
            {isAutoRespondsOpen && (
                <div style={{
                    position: 'sticky',
                    top: '0',
                    backgroundColor: '#ffffff',
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    bottom: '60px', // adjust the bottom position to align with the input bar
                    left: '50px',
                    right: '0',
                    zIndex: 1,
                    borderRadius: '10px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}>
                    <AutoRespondsList onMessageClick={handleAutoRespondClick} webId={webId}/>
                </div>
            )}
        </>
    );
};

export default ChatMessageHistory;
