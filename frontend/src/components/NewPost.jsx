import classes from "./NewPost.module.css";
import { useState } from "react";

export default function NewPost({ onCancel, onAddPost }) {
  const [enteredBody, setEnteredBody] = useState("");
  const [enteredAuthor, setEnteredAuthor] = useState("");

  function changeBodyHandler(event) {
    setEnteredBody(event.target.value);
  }
  function changeAuthorHandler(event) {
    setEnteredAuthor(event.target.value);
  }

  async function submitHandler(event) {
    event.preventDefault();
    const postData = {
        body: enteredBody,
        author: enteredAuthor,
      };    
    const response = await fetch("http://localhost:8080/posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if(!response.ok){
      throw new Error("Failed to send post");
    }
      onAddPost(data.posts);
      onCancel();
  }

  return (
    <form
      className={classes.form}
      onSubmit={submitHandler}
    >
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" rows={3} onChange={changeBodyHandler} required/>
      </p>
      <p>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" required onChange={changeAuthorHandler} />
      </p>
      <p className={classes.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button>Submit</button>
      </p>
    </form>
  );
}
