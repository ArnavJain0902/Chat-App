import PostList from "./components/PostList";
import MainHeader from "./components/MainHeader";
import { useState } from "react";

function App() {
  const [isPosting, setIsPosting] = useState(false); //isPosting is a state variable that is used to determine if the user is posting a new post
  function handlePost() {
    setIsPosting(!isPosting);
  }
  return (
    <main>
      <MainHeader onCreatePost={handlePost} />
      <PostList 
        isPosting={isPosting} 
        onStopPosting={() => setIsPosting(false)} 
      />
    </main>
  );
}

export default App;
