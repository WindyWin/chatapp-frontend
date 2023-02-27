import { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../../component/layout";
import { Home, Login, NotFound } from "../page";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <div>"select a conversation to geting started"</div>
          },
          {
            path: "conversation/:id",
            element: <div>"conversation"</div>
          }
        ]
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Login />
      }]
  },

  {
    path: "*",
    element: <NotFound />,
  }
]);


export default router;