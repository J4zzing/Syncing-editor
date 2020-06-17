import React, { useState, useEffect, useRef } from "react";
import { useDocId } from "./CustomHooks";

interface Props {
  socket: SocketIOClient.Socket;
}
interface Message {
  author?: string;
  content: string;
  time: number;
}
export const ChatBoard = (props: Props) => {
  const { socket } = props;
  const id = useDocId();
  const [name, setName] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const event = `remote-message-to-${id}`;
    socket.on(event, (msg: Message) => {
      setMessages([...messages, msg]);
    });

    return () => {
      socket.off(event);
    };
  });

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const input = ev.currentTarget.querySelector("#m") as HTMLInputElement;

    if (input) {
      socket.emit("new-message", {
        to: id,
        content: input.value,
        time: ev.timeStamp,
      } as Message);

      input.value = "";
    }
  };

  return (
    <div className="chatboard ">
      <div className="collabrators">
        所有协同作者：<span>无</span>
      </div>
      <div className="messages">
        <ul>
          {messages.map((msg) => (
            <li key={msg.time}>{`${msg.author}:${msg.content}`}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <BorderlessInput default="匿名:" />
        <input
          id="m"
          className="form-control"
          required
          placeholder="说点什么..."
        />
        <button type="submit" id="btn-send" className="btn btn-info">
          发送
        </button>
      </form>
    </div>
  );
};

const BorderlessInput = (props: { default: string }) => {
  const [state, setState] = useState<string>(props.default);
  return (
    <input
      type="text"
      value={state}
      onChange={(ev) => {
        setState(ev.target.value);
      }}
      style={{
        margin: "0 0 0.15rem",
        border: 0,
        backgroundColor: "transparent",
      }}
    />
  );
};

export default ChatBoard;
