
import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [chatUser, setChatUser] = useState({
        id: '',
        name: '',
        recieverID: '',
        recieverName: '',
    });

    return (
        <ChatContext.Provider value={{ chatUser, setChatUser }}>
        {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);
