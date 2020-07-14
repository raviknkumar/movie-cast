import React, {useEffect, useState} from 'react';
import ChatIconSvg from './../../assets/chat.svg'
import './../../styles/ChatBox.css'
import Avatar from "../common/Avatar";
import Messages from "./Messages";
import SendIcon from './../../assets/send.svg';
import {socket} from "../../global/header";
import 'emoji-mart/css/emoji-mart.css'

const ChatBox = (props) => {

    const [userName] = useState('User Name!');
    const [inboxVisible, setInboxVisible] = useState(true);
    const [text, setText] = useState('');

    const [messages, setMessages] = useState([]);

    useEffect(() => {

        socket.on('message', receiveMessage);

        // clean up code
        return (() => {
            console.log("Removing Socket Connection On 'message' ")
            socket.off('message', receiveMessage);
        })

    }, [messages]);

    function sendMessage(e) {
        console.log("New Messages: ", text);
        e.preventDefault();
        socket.emit('chatMessage', text);
        setText('');
    }

    function receiveMessage(message) {
        console.log("Message From Server: ", message);
        setMessages([...messages, message]);
    }

    function renderChatBox() {
        if (inboxVisible) {
            return (
                <div className="flex flex-col absolute bottom-0 right-0 mr-2 mb-16 w-full sm:w-1/4 h-threeFour
                shadow-2xl">

                    <div className="flex-initial flex bg-indigo-600 p-4">
                        <div className={"flex items-center"}>
                            <Avatar displayText={userName.charAt(0)} width={8} height={8} background={"bg-gray-500"}/>
                        </div>
                        <div className={"flex-1 flex flex-col justify-center text-white ml-2"}>
                            <p>Hello {userName}</p>
                            <p>Welcome to Chat</p>
                        </div>
                    </div>

                    <Messages messages={messages}/>

                    {/*form*/}
                    <form className="w-full max-w-sm border-t-2 border-gray-400 pl-1 pr-1" onSubmit={sendMessage}>
                        <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
                            <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none ml-1 mr-1"
                                onChange={event => setText(event.target.value)}
                                value={text}
                                type="text" placeholder="Chat with friends" aria-label="Full name"/>
                            <button
                                onClick={sendMessage}
                                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                                type="submit">
                                <img src={SendIcon} alt={"send"} className={"w-6 h-6"}/>
                            </button>
                        </div>
                    </form>
                </div>
            );
        }
    }

    function toggleInbox() {
        setInboxVisible(!inboxVisible);
    }

    return (
        <div>

            {renderChatBox()}

            <button className={"w-10 h-10 absolute bottom-0 right-0 m-4 p-2 rounded-full bg-indigo-400"}
                    onClick={toggleInbox}>
                {
                    inboxVisible ?
                        <img src={ChatIconSvg} alt={"open Chat"}/> :
                        <p>X</p>
                }
            </button>
        </div>
    );
};

export default ChatBox;
