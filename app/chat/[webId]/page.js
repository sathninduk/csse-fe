'use client';
import React, {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import {AddMessage, GetMessagesByVisitorId} from '@/services/MessageService';

import Keys from '@/Keys';

import useSocket from "socket.io-client";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane, faTimes} from "@fortawesome/free-solid-svg-icons";


const ChatWithAdmin = () => {

    const [visitorEmail, setVisitorEmail] = useState('');
    const [enteredEmail, setEnteredEmail] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [validEmail, setValidEmail] = useState(false); // State to track email validity
    const { webId } = useParams();
    const socket = useSocket(Keys.MESSAGE_SERVICE_API_URL);



    const validateEmail = (email) => {
        // Regular expression for email validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regex.test(email)) {
            setValidEmail(true);
            return true;
        } else {
            setValidEmail(false);
            return false;
        }
    };
    const handleVisitorEmailChange = (event) => {
        setVisitorEmail(event.target.value);
        validateEmail(event.target.value);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            const fetchMessages = async () => {
                const lastMessages = await GetMessagesByVisitorId({ webId, visitorId: localStorage.getItem('visitorId') });
                setMessages(lastMessages);
            };
            fetchMessages(); // Fetch messages after delay
        }, 1000); // Adjust delay time as needed

        // Clear the timer on component unmount
        return () => clearTimeout(timer);

    }, [webId, socket]); //


    // Handle visitor email submission
    const handleVisitorEmailSubmit = async () => {
        if (validateEmail(visitorEmail)) {
            // If email is valid, proceed
            const visitorId = generateVisitorId();
            localStorage.setItem('visitorId', visitorId.toString());
            setEnteredEmail(true);


        } else {
            // Display error message under email input field
            setEmailError('Please enter a valid email address.');
        }
    };

    // State to track email error message
    const [emailError, setEmailError] = useState('');

    // Remove visitorId from localStorage on tab close
    useEffect(() => {
        const handleTabClose = () => {
            localStorage.removeItem('visitorId');
        };
        window.addEventListener('beforeunload', handleTabClose);
        return () => {
            window.removeEventListener('beforeunload', handleTabClose);
        };
    }, []);

    // Generate a random visitorId
    const generateVisitorId = () => {
        return Math.floor(Math.random() * 1000000);
    };

    // Handle message input change
    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    // Send a message to the server
    const sendMessage = async () => {
        const data = {
            visitorId: localStorage.getItem('visitorId'),
            visitorName: visitorEmail,
            sender: 'visitor',
            message: message,
            time: new Date().toISOString(),
        };


        // Add the autoRespontList message to Firestore
        const response = await AddMessage({ webId }, data);

        // Get the updated list of messages from Firestore
        const updatedMessages = await GetMessagesByVisitorId({ webId, visitorId: localStorage.getItem('visitorId') });

        setMessages(updatedMessages);
        setMessage('');
    };



    // Define headerText based on whether an email is entered
    const headerText = enteredEmail ? 'Chat' : 'Enter Your Email';


    // Sort messages based on their timestamps and map through them
    return (
        <div>

        <div className="chat-window" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#fff',
            border: 'none',
            borderRadius: 0,
            boxShadow: 'none',
            zIndex: 100 }}>
            <div className="chat-header" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                backgroundColor: '#004a77',
                borderBottom: '1px solid #ddd',
                borderRadius: '4px 4px 0 0'
            }}>
                <h2 style={{
                    margin: '0',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: 'white'
                }}>{headerText}</h2>

            </div>
            {enteredEmail ? (
                <div style={{
                    position: 'fixed',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderTop: '1px solid #ddd',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                    <input value={message} onChange={handleMessageChange} placeholder="Type a message..." style={{
                        flexGrow: 1,
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        marginRight: '10px'
                    }}/>
                    <div onClick={sendMessage} style={{marginRight: '20px'}}><FontAwesomeIcon icon={faPaperPlane} size="1x" color="black"/>
                    </div>
                </div>
            ) : (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center' }}>
                    <input value={visitorEmail} onChange={handleVisitorEmailChange} placeholder="Enter your email..." style={{ fontSize: '14px', padding: '10px 20px', borderRadius: '4px', border: '1px solid #ddd', marginBottom: '10px', width: '200px' }} />
                    <button style={{
                        backgroundColor: '#004a77',
                        border: '1px solid #ddd',
                        padding: '10px 20px',
                        fontSize: '14px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                        width: '200px' }} onClick={handleVisitorEmailSubmit}>Submit</button>
                    {emailError && <div style={{
                        color: 'red',
                        marginTop: '5px' }}>{emailError}</div>}
                </div>
            )}
            {enteredEmail && (
                <div
                    style={{
                        overflowY: 'scroll',
                        width: '100%',
                        height: 'calc(100vh - 100px)',
                        padding: '10px',
                        WebkitOverflowScrolling: 'touch', // Add this line for smooth scrolling on mobile
                    }}
                >
                    <div>
                        {messages.sort((a, b) => new Date(a.time) - new Date(b.time)).map((msg, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                flexDirection: msg.sender === 'visitor' ? 'row-reverse' : 'row',
                                alignItems: 'center',
                                justifyContent: 'pace-between',
                                marginTop: '10px'
                            }}>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <div style={{
                                        backgroundColor: msg.sender === 'visitor' ? '#0c3073' : '#7b8186',
                                        color: 'white',
                                        padding: '5px 10px',
                                        borderRadius: '10px',
                                        marginRight: msg.sender === 'visitor' ? '10px' : 0,
                                        marginLeft: msg.sender === 'websiteOwner' ? '10px' : 0,
                                        alignSelf: 'flex-start'
                                    }}>
                                        {msg.message}
                                    </div>
                                    <div style={{
                                        fontSize: '12px',
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
                </div>
            )}
        </div>

 </div>
 );
};

export default ChatWithAdmin;