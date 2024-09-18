import React, { useState } from 'react';
import styled from '@emotion/styled';

const InputContainer = styled.div`
    display: flex;
`;

const Input = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
`;

const SendButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
`;

const ChatInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        onSendMessage(message);
        setMessage('');
    };

    return (
        <InputContainer onSubmit={handleSendMessage}>
            <Input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <SendButton type="submit">Send</SendButton>
        </InputContainer>
    );
};

export default ChatInput;