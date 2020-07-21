import React from 'react';
import ChatBox from "./chat/ChatBox";
import VideoPlayer from "./video/VideoPlayer"
import CustomPlayer from "./video/CustomPlayer"
import Controls from "./video/Controls"

const Main = (props) => {
    return (
        <div className={"h-full"}>
            <VideoPlayer/>
            <ChatBox/>
        </div>
    );
};


export default Main;
