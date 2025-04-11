import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ChatList = () => {

    const { id } = useParams();

    const [chats, setChats] = useState(['John Doe', 'William Salvator', 'Damon', "Katherine"]);

    const myID = 201

    useEffect(() => {
        axios.get(`https://localhost:7177/api/Messages/distinct-senders/${myID}`)
        .then(response => {
            console.log(response.data);
            setChats(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

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
                <Link to={`/chat/${chat.senderID}`} style={{textDecoration: "none"}}>
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
