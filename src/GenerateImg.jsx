import React, { useState } from "react";

export const GenerateImg = ({ openai }) => {
  const [promptVal, setpromptVal] = useState("");
  const [imgUrl, setimgUrl] = useState("");

  const onChangeInput = (value) => {
    setpromptVal(value.target.value);
  };

  const handleOnClick = async () => {
    if (openai) {
        const response = await openai.createImage({
            prompt: promptVal,
            n: 1,
            size: "1024x1024",
          });
          const image_url = response.data.data[0].url;
          setimgUrl(image_url);
    }
  }

  return <div>
     <input
        type="text"
        value={promptVal}
        name="content"
        style={{ width: "300px" }}
        onChange={onChangeInput}
      ></input>
      <button type="button" className="button" onClick={handleOnClick}>
        submit
      </button>
      <div style={{ margin: '20px' }}>
      { imgUrl !== '' ? <img width={400} alt="img" src={imgUrl}></img> : null }
      </div>
  </div>;
};
