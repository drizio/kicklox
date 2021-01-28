import React, { useEffect, useState, SyntheticEvent } from "react";
import { useAsync } from "../hooks/query";
import { fetchApi, Status, MessageType, list_to_tree } from "../utils/";
import Message from "./Message";
export default function Messages() {
  const [text, setText] = useState("");
  const [replying, setReplying] = useState<MessageType| null>(null);

  const { data, status, error, run } = useAsync({ status: Status.IDLE });

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const onReply = (message: MessageType) => {
    setReplying(message)
  }

  const handleSubmit = (event: SyntheticEvent) => {
      fetchApi(`http://localhost:${process.env.SERVER_PORT || 3007}/messages`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: 'user 2',
          content: text,
          isPublic: true,
          createdAt: new Date(),
          parentId: (replying) ? replying.id : null
        })
      })
  
  };

  useEffect(() => {
    run(
      fetchApi(`http://localhost:${process.env.SERVER_PORT || 3007}/messages`)
    );
  }, [run]);
  if (status === "idle") {
    return <span>No playlist</span>;
  } else if (status === "pending") {
    return <span>loading</span>;
  } else if (status === "rejected") {
    throw error;
  } else if (status === "resolved") {
    console.log(list_to_tree(data))
    return (
      <>
        {list_to_tree(data).map((mes, index) => (
          <Message message={mes} onReply={onReply} key={index} />
        ))}

        { replying && (<div>
          <p>replying on </p>
          <p>{replying.user}'s message, created on {replying.createdAt}</p>
          <button onClick={()=>{ setReplying(null)}}> Cancel reply</button>
        </div>)}

        <form onSubmit={handleSubmit}>
          <label>
            message:
            <textarea value={text} onChange={handleChange} />
          </label>
          <input type="submit" value="Envoyer" />
        </form>
      </>
    );
  }
}

