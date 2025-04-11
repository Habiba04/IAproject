import React from 'react'
import ChatList from './ChatList'
import ChatRoom from './ChatRoom'
import "bootstrap/dist/css/bootstrap.min.css";

const ChatPage = () => {
    return (
        <div>
        
            <div className="row" style={{paddingRight: "0", marginRight: "0"}}>
                <div className="col-3" style={{marginLeft: "0px", paddingRight:"0"}}>
                <ChatList/> 
                </div>
                <div className="col" style={{paddingLeft:"0", paddingRight:"0", maxHeight: "88vh", maxWidth: "80%"}} >
                <ChatRoom/> 
                </div>
            </div>
            
        </div>
    )
}

export default ChatPage
