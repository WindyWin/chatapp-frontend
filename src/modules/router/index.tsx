import { Children } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Layout from "../../component/layout";
import AuthProtecter from "../context/AuthProvider";
// import { ConversationProvider } from "../context/ConversationProvider";
import { SocketProvider } from "../context/SocketProvider";
import { Conversation, Home, Login, NotFound, Profile, Register } from "../page";

const AuthLayout = () => {
  return (
    <AuthProtecter>
      <Outlet />
    </AuthProtecter >
  )
}
const ClientLayout = () => {
  return (
    <SocketProvider>
      {/* <ConversationProvider> */}
      <Layout />
      {/* </ConversationProvider> */}
    </SocketProvider>
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

        element: <ClientLayout />,
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