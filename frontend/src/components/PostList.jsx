import Post from "./Post";
import classes from "./PostList.module.css";
import NewPost from "./NewPost";
import { useState } from "react";
import Modal from "./Modal";
import { useEffect } from "react";

export default function PostList({ isPosting, onStopPosting }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/posts");
      const data = await response.json();
      setPosts(data.posts);
      setIsLoading(false);
    }

    fetchPosts();
  }, []);

  function addPostHandler(postData) {
    setPosts((prevPost) => {
      return [postData, ...prevPost];
    });
  }

  return (
    <>
      {isPosting ? (
        <Modal isVisibleHandler={onStopPosting}>
          <NewPost
            onCancel={onStopPosting}
            onAddPost={addPostHandler}
          ></NewPost>
        </Modal>
      ) : null}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        posts.length > 0 && (
          <ul className={classes.posts}>
            {posts.map((post) => (
              <Post
                key={post.body}
                author={post.author}
                body={post.body}
              ></Post>
            ))}
          </ul>
        )
      )}

      {posts.length === 0 && !isLoading && <p>No posts found</p>}
    </>
  );
}
