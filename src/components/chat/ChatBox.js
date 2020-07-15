import React, {useContext, useEffect, useState} from 'react';
import ChatIconSvg from './../../assets/chat.svg'
import './../../styles/ChatBox.css'
import Avatar from "../common/Avatar";
import Messages from "./Messages";
import SendIcon from './../../assets/send.svg';
import {socket} from "../../global/header";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from "emoji-mart";
import CloseIcon from '../../assets/close-white.svg';
import {AuthContext} from "../../contexts/AuthContext";
import SmileIcon from '../../assets/smile.svg'

const ChatBox = (props) => {

    const [inboxVisible, setInboxVisible] = useState(true);
    const [text, setText] = useState('');
    const [emojiPickerState, SetEmojiPicker] = useState(false);

    let emojiPicker;
    if (emojiPickerState) {
        emojiPicker = (
          <Picker
            title="Pick your emoji…"
            emoji="point_up"
            onSelect={emoji => setText(text + emoji.native+" ")}
          />
        );
    }

    function triggerPicker(event) {
        event.preventDefault();
        SetEmojiPicker(!emojiPickerState);
    }

    const [messages, setMessages] = useState([]);
    const {getUserName} = useContext(AuthContext);

    useEffect(() => {

        socket.on('message', receiveMessage);

        // clean up code
        return (() => {
            console.log("Removing Socket Connection On 'message' ");
            socket.off('message', receiveMessage);
        })

    }, [messages]);

    function sendMessage(e) {

        e.preventDefault();
        if(!text){
            console.log("Empty Text");
            return;
        }

        console.log("New Messages: ", text);
        socket.emit('chatMessage', text);
        setText('');
        if(emojiPickerState)
            triggerPicker(e);
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
                    <div className="flex-initial flex bg-linear-gradient p-4">
                        <div className={"flex items-center"}>
                            <Avatar displayText={getUserName().charAt(0)} width={8} height={8} background={'bg-indigo-400'} color={'text-white'}/>
                        </div>
                        <div className={"flex-1 flex flex-col justify-center text-white ml-2"}>
                            <p>Hello {getUserName()}</p>
                            <p>Welcome to Chat</p>
                        </div>
                    </div>

                    <Messages messages={messages}/>
                    {emojiPicker}

                    {/*form*/}
                    <form className="w-full max-w-sm border-t-2 border-gray-400 bg-white" onSubmit={sendMessage}>
                        <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
                            <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-1 leading-tight focus:outline-none ml-1 mr-1"
                                onChange={event => setText(event.target.value)}
                                value={text}
                                type="text" placeholder="Chat with friends" aria-label="Full name"/>
                            <button
                              type="button"
                              className="mr-2"
                              onClick={triggerPicker}>
                                <span role="img" aria-label="" title={"Add emoji click to open/close"}>
                                <img src={SmileIcon} alt={"emoji"} className={"w-6 h-6"}/>
                                </span>
                            </button>
                            <button
                                onClick={sendMessage}
                                className="flex-shrink-0 text-sm py-1 px-2 rounded"
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

            <button className={"w-10 h-10 absolute bottom-0 right-0 m-4 p-2 rounded-full bg-linear-gradient"}
                    onClick={toggleInbox}>
                {
                    inboxVisible ?
                      <img src={CloseIcon} alt={"Close Chat"}/>:
                      <img src={ChatIconSvg} alt={"open Chat"}/>
                }
            </button>
        </div>
    );
};

export default ChatBox;
