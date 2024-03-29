import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "../../styles/CreatePost.css";

function CreatePost(props) {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const textRef = useRef();

  const createPostHandler = (event) => {
    setIsLoading(true);
    event.preventDefault();
    console.log("yes");
    fetch("http://localhost:8080/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        text: textRef.current.value,
        name: localStorage.getItem("user"),
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          props.new(data._id);
          setIsLoading(false);
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {!isLoading && (
        <div className="createpost">
          <div className="createpost__input">
            <input type="text" placeholder="Say Something..." ref={textRef} />
          </div>
          <div className="createpost__btn">
            <button onClick={createPostHandler}>Submit</button>
          </div>
        </div>
      )}
    </>
  );
}

export default CreatePost;
