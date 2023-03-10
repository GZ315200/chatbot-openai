import "./ListChat.css";
import React, { useState } from "react";

import { Configuration, OpenAIApi } from "openai";
import { useDispatch } from "react-redux";
import { addChat } from "./Reducers/chatSlider";
import { ListChatMsg } from "./ListChatMsg";
import { GenerateImg } from './GenerateImg'
 
const API_KEY = process.env.REACT_APP_API_KEY;


const configuration = new Configuration({
  apiKey: API_KEY
});

const openai = new OpenAIApi(configuration);

function App() {
  const [promptVal, setpromptVal] = useState("");
  const [ state, setState ] = useState({
    contentError: null
 });

  const dispatch = useDispatch();

  const onChangeInput = (value) => {
    setpromptVal(value.target.value);
  };

  const handleOnClick = () => {
    if(promptVal === ''){
      setState({...state, 
         contentError: 'You must write something!'});
       return;
    }
    const completion = openai.createCompletion({
      model: "text-davinci-003",
      prompt: String(promptVal),
    });
    completion.then((res) => {
      console.log("res", res);
      if (res.status === 200) {
        dispatch(addChat(
          { text: res.data.choices,
          qustion: promptVal
        }));
      }
    });
  };

  const keyDownHandler = (event) => {
    if (event.code === "Enter") {
      handleOnClick();
    }
  };

  // const listItems = contentVal.map((val) => <span>{val.text}</span>);

  const { contentError } = state;

  return (
    <div className="form">
      <h2>Chat Everything, Have a fun!</h2>
      <input
        type="text"
        value={promptVal}
        name="content"
        style={{ width: "300px" }}
        onChange={onChangeInput}
        onKeyDown={keyDownHandler}
      ></input>
      <span style={{ margin: '20px' }}>试试Enter健</span>
      <button type="button" className="button" onClick={handleOnClick}>
        submit
      </button>
      {contentError ? <div className="error">{contentError}</div> : null}
      <ListChatMsg />
      <h2>Generate Anything Image, Have a fun!</h2>
      <GenerateImg openai={openai} />
    </div>
  );
}

export default App;
