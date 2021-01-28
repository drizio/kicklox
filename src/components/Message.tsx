import React from 'react';
import { MessageType, parseMarkdown} from "../utils/index";

export default function Message({message, onReply}: {message: MessageType, onReply: (message: MessageType) => void}){
    const handleReply = (message: MessageType) => {
        onReply(message)
    }
    if(message.isPublic) {
        return(
            <div>
                <div className="message">
                    <span>{message.user}</span> - <span>{(new Date(message.createdAt)).toLocaleDateString()}</span>
                </div>
                
                <div style={{ paddingLeft: "30px", borderLeft: "solid 1px black" }}>
                    <p dangerouslySetInnerHTML={{__html: parseMarkdown(message.content)}}></p> <button onClick={() => handleReply(message)}>Reply</button>
                    {message.children?.map((mes, i) => <Message key={i} message={mes} onReply={onReply}/>)}
                    
                </div> 
            </div>
        )
    } else {
        return <div></div>
    }
    
}