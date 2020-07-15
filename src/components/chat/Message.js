import React, {useContext} from 'react';
import Avatar from "../common/Avatar";
import {AuthContext} from "../../contexts/AuthContext";
import '../../styles/Messages.css'
import {Strings} from '../../utils/Constants';

const Message = ({message}) => {

  const {getUserName} = useContext(AuthContext);

  return (
      <div className={"text-sm"}>
        {renderMessage(message, getUserName)}
      </div>
  );
};

const renderMessage = (message, getUserName) => {
  if(message.from.localeCompare(Strings.botName) === 0){
    // botName message
    return <AdminMessage message={message}/>;
  }
  else if(message.from.localeCompare(getUserName()) === 0){
    return <FromMessage message={message}/>;
  }
  else {
    // default to toMessage
    return <ToMessage message={message}/>;
  }
};

const ToMessage = ({message}) => {
  return (
    <div className={"flex mt-1"}>
      <Avatar displayText={message.from.charAt(0)} width={6} height={6}
              background={'bg-indigo-400'}
      />
        <div className={"flex flex-col ml-1"}>
          <span className="toMessage inline-block rounded-full rounded-tl-none p-2 pl-3 pl-3 bg-gray-300">{message.message}</span>
          <span className={"inline-block text-gray-500 text-xs"}>{message.timestamp}</span>
        </div>
    </div>
  );
};

const FromMessage = ({message}) => {
  return (
      <div className={"flex flex-col ml-auto mt-1"} style={{maxWidth:'85%'}}>
        <span className="fromMessage ml-auto p-2 pl-5 pr-4 rounded-full rounded-br-none">{message.message}</span>
        <span className={"inline-block text-gray-500 text-xs ml-auto"}>{message.timestamp}</span>
      </div>
  );
};

const AdminMessage = ({message}) => {
  return (
    <div className={"flex flex-col mt-1 text-sm"}>
      <span className="text-center font-semibold">
        {message.message}
      </span>
      <span className="text-center">
        {message.timestamp}
      </span>
    </div>
  );
}


export default Message;
