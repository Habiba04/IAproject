import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useChat } from '../../context/CharContext';
const ChatList = () => {

    const { id } = useParams();
    const {setChatUser} = useChat();
    const [chats, setChats] = useState([]);

    const myID = 201
    const myName = 'ahmed'
    

    useEffect(() => {
        axios.get(`https://localhost:7098/api/Messages/distinct-senders/${myID}`)
        .then(response => {
            console.warn(response.data);
            setChats(response.data);
        })
        .catch(error => {
            console.warn(error);
        });
    }, []);

    useEffect(() => { 
        if (id && chats.length > 0) {
                // console.log(chats);
            setChatUser(prev => ({
                ...prev,
                recieverID: id,
                recieverName: chats.filter((chat) =>
                chat.senderID == id ? chat.senderName : ""
                )[0].senderName,
                name: myName,
                id: myID,
            }));
            } if(!id) {
            setChatUser((prev) => ({
                ...prev,
                name: myName,
                id: myID,
            }));
            }
    }, [id,myID]);

if (chats.length == 0) {
    return (
        <div style={{backgroundColor: "#EAECEE", height: "88vh", overflow: "auto"}}>
            <ul style={{listStyle: "none", margin: "0", paddingLeft: "0"}}>
                <li style={{paddingTop: "10px", paddingBottom: "10px", backgroundColor: "#2C3E50", borderBottom: "solid", borderBottomColor: "#1A2D42"}}>
                    <span style={{fontWeight: "bold", color: "white"}}>No messages yet</span>
                </li>
            </ul>
        </div>
    )
}

    return (
        <div style={{backgroundColor: "#EAECEE", height: "88vh", overflow: "auto"}}>
            <ul style={{listStyle: "none", margin: "0", paddingLeft: "0"}}>

            {chats.map((chat, index) => (
                <Link key={index} to={`/chat/${chat.senderID}`} style={{textDecoration: "none"}}>
                    <li key={index} style={{paddingTop: "10px", paddingBottom: "10px", backgroundColor: (chat.senderID) == id ? "#2C3E50" : "#4A6572", borderBottom: "solid", borderBottomColor: "#1A2D42", cursor: "pointer", transition: "background-color 0.3s ease"}}>
                        <img src="/assets/avatar.png" alt="profile" style={{maxWidth:"40px", marginLeft: "10px", marginRight: "10px"}} />
                        <span style={{fontWeight: "bold", color: "white"}}>{chat.senderName}</span>
                    </li>
                </Link>
                

            ))}

            </ul>
        </div>
    )
}

export default ChatList
