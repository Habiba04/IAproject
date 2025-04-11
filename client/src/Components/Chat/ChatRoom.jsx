/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import * as signalR from "@microsoft/signalr";
import axios from "axios";
import { useChat } from '../../context/CharContext';


const ChatRoom = () => {
    const { chatUser } = useChat();
    // const chatUserRef = useRef(chatUser);
    useEffect(() => {
        // chatUserRef.current = chatUser;
        console.log("from ref ");
        console.log(chatUser);
    }, [chatUser]);

    const { id } = useParams();
    const myID = 201;

    const [message, setMessage] = useState({ senderID: myID, recieverID: id, content: "", recieverName: '', senderName: '' });
    
    const [messages, setMessages] = useState([]);
    
    const messagesEndRef = useRef(null);
    const connectionRef = useRef(null);
    //every id change will bring messages
    useEffect(() => {
      setMessage((prev) => ({
        ...prev,
        recieverID: chatUser.recieverID,
        recieverName: chatUser.recieverName,
        senderName: chatUser.name,
        senderID: chatUser.id,
      }));
    }, [id,chatUser]);

    const sendMessage = () => {
        if (message.content.trim() !== "") {
        console.log(message);
        connectionRef.current.invoke("SendMessage", message.senderID.toString(), message.recieverID.toString(), message.content, message.recieverName, message.senderName);
        setMessages([...messages, message]);
        setMessage({ ...message, content: "" }); // reset editor
        }
    };


    useEffect(() => {
        if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);
    
    useEffect(() => {
        console.log("Room");
        console.log(chatUser);
        // Fetch old messages
        axios.get(`https://localhost:7098/api/Messages/conversation?senderID=${myID}&recieverID=${id}`)
            .then(res => setMessages(res.data));

        // Setup SignalR connection
        //update with hub link
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`https://localhost:7098/hubs/chat?senderID=${myID}&recieverID=${id}`, {withCredentials: true})
            .withAutomaticReconnect()
            .build();

        connection.on("ReceiveMessage", msg => {
            if ((msg.senderID === id && msg.recieverID === myID) || (msg.senderID === myID && msg.recieverID === id)) {
                setMessages(prev => [...prev, msg]);
            }
        });

        connection.on("ReceiveHistory", history => {
            // console.log(history);
            setMessages(history);
        })

        connection.start().then(async() => {
            // console.log("SignalR Connected");
        }).catch(console.error);
        
        connectionRef.current = connection;

        return () => {
            if(connection)
                connection.stop();
            setMessages([]);
            setMessage({ ...message,recieverID: "", content: "", recieverName: '' });
        };
    }, [id, myID]);

    return (
        <div
        style={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "flex-end",
            width: "100%",
        }}
        className="col-12"
        >
        <div
            className="chatBox"
            style={{
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            flexGrow: 1,
            padding: "10px",
            }}
        >
                {messages.map((msg, index) => {
                // console.log(msg);
                const isMyMessage = msg.senderID == myID  ;
                // console.log(isMyMessage);

            return (
                <div
                key={index}
                style={{
                    display: "flex",
                    justifyContent: isMyMessage ? "flex-end" : "flex-start",
                    width: "100%",
                }}
                >
                <div
                    style={{
                    maxWidth: "70%",
                    backgroundColor: isMyMessage ? "#1A2D42" : "white",
                    color: isMyMessage ? "white" : "black",
                    padding: "10px",
                    borderRadius: "10px",
                    margin: "5px",
                    fontSize: "14px",
                    textAlign: "left",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    }}
                    dangerouslySetInnerHTML={{ __html: msg.content }}
                />
                </div>
            );
            })}
            <div ref={messagesEndRef} />

        </div>

        <div
            className="textbar"
            style={{
            borderTop: "2px solid rgb(74 101 114 / 14%)",
            display: "flex",
            alignItems: "center",
            }}
        >
            <ReactQuill
            theme="bubble"
            value={message.content}
            onChange={(content) => setMessage({ ...message, content })}
            placeholder="Type your message here"
            style={{ width: "94%" }}
            />
            <button
            style={{ backgroundColor: "#1A2D42", flexGrow: 1, border: "none", height:"100%" }}
            onClick={sendMessage}
            >
            <FontAwesomeIcon icon={faPaperPlane} style={{ color: "white" }} />
            </button>
        </div>
        </div>
    );
};

export default ChatRoom;
