import { Children } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import ClientLayout from "../../component/layout";
import AuthProvider from "../context/AuthProvider";
import { SocketProvider } from "../context/SocketProvider";
import { Conversation, Home, Login, NotFound, Profile, Register } from "../page";

const AuthLayout = () => {
  return (
    <AuthProvider>

      <Outlet />
    </AuthProvider >
  )
}

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [

      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {

        element: <SocketProvider><ClientLayout /></SocketProvider>,
        children: [
          {
            path: "/",
            element: <Home />,


          },
          {
            path: "/conversation/:conversationId",
            element: <Conversation />
          },
          {
            path: "/profile",
            element: <Profile />
          },
          {
            path: "/profile/:Uid",
            element: <Profile />
          },
        ]
      },]

  },

]);


export default router;