import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import "./index.css";
import Posts from "./routes/Posts.jsx";

import NewPost from "./routes/NewPost.jsx";
import RootLayout from "./routes/RootLayout.jsx";
import PostDetails from "./routes/PostDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <Posts />,
        loader: async () => {
          const response = await fetch("http://localhost:8080/posts");
          const data = await response.json();
          return data.posts;
        },
        children: [
          {
            path: "/create-post",
            element: <NewPost />,
            action: async ({ request }) => {
              const formData = await request.formData();
              const postData = Object.fromEntries(formData);
              await fetch("http://localhost:8080/posts", {
                method: "POST",
                body: JSON.stringify(postData),
                headers: { "Content-Type": "application/json" },
              });
              return redirect("/");
            },
          },
          {
            path:"/:id",
            element:<PostDetails></PostDetails>,
            loader:async ({params})=>{
              const response = await fetch("http://localhost:8080/posts/"+ params.id);
              const data = await response.json()
              return data.post
            }
          }
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
