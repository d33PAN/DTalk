import React, { useContext } from "react";
import "./home.css";
import more from "../../assets/more.svg";
import videoCall from "../../assets/videoCall.svg";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../../context/ChatContext";

function Chat() {
  const {data} = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data?.user.displayName}</span>
        <div className="chatIcons">
          <img
            src={videoCall}
            alt=""
            title ={`click to start video call with ${data.user?.displayName}`}
          />
          <img src={more} alt="" title="click to see more options" />
        </div>
      </div>
      {  data?.chatId ?<Messages/>: <div className="messages"></div>}
      <Input/>
    </div>
  );
}

export default Chat;
