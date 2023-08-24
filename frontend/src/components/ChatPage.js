import React, { useState, useEffect } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  // useEffect(() => {
  //   socket.on("messageResponse", (data) => {
  //     setMessages((prevMessages) => [...prevMessages, data]);
  //   });

  // }, [socket, messages]);
  // // check to remove messages
  useEffect(() => {
    const messageResponseHandler = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on("messageResponse", messageResponseHandler);

    return () => {
      socket.off("messageResponse", messageResponseHandler);
    };
  }, [socket]);
  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody messages={messages} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
