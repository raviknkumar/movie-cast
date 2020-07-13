import React from 'react';
import Avatar from "../common/Avatar";

const Message = ({message}) => {
    return (
        <div className={"flex mt-1"}>
            <Avatar displayText={message.from.charAt(0)} width={6} height={6}
                    background={'bg-indigo-400'}
            />
            <div className={"flex flex-col ml-1"}>
                <span className={"inline-block rounded-full rounded-tl-none p-2 pl-3 pl-3 bg-gray-500 text-white"}>{message.message}</span>
                <span className={"inline-block text-gray-500 text-xs"}>{message.timestamp}</span>
            </div>
        </div>
    );
};

export default Message;
