import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteChat  } from "./Reducers/chatSlider";
import "./ListChat.css";

export const ListChatMsg = () => {
  const { chatList } = useSelector((state) => state.chatbot);
  const dispatch = useDispatch();
 
  return (
    <div>
      <ul className="chatlist">
          {chatList.map(({ id, content, qustion }) => {
            return (
              <li className="grid" key={id}>
                 <span className="question">Q: {qustion}</span>
                 { content.map(({ text }) => {
                    return <span className="content">{text}</span>
                 }) }
                <span className="chat-action">
                  <AiOutlineCloseCircle
                    className="close"
                    onClick={() => dispatch(deleteChat({ id }))}
                  />
                </span>
              </li>
            );
          })}
        </ul>
    </div>
  );
};
