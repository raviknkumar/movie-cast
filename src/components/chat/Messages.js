import React, {useRef, useEffect} from 'react';
import './../../styles/Messages.css';
import Message from "./Message";

const Messages = ({messages}) => {
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    };
    useEffect(scrollToBottom, [messages]);

    return (
        <div style={{overflowY:'scroll', flex: '1 1 auto'}} className={"mt-1 p-2"}>
            {messages.map((message, index) => (
                <Message key={index} message={message} />
            ))}
            <div ref={messagesEndRef}/>
        </div>
    );
};

export default Messages;
