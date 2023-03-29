import { createBrowserRouter, Outlet } from "react-router-dom";
import Layout from "../../component/layout";
import AuthProtecter from "../context/AuthProvider";
import { Chat, Home, Login, NotFound, Profile, Register } from "../page";

import ColorModeProvider from "../context/ColorModeContext";








const AuthLayout = () => {

  return (
    <AuthProtecter>
      <ColorModeProvider>
        <Outlet />
      </ColorModeProvider>
    </AuthProtecter >
  )
}
const ClientLayout = () => {
  return (

    <Layout />

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
            path: "/chat/:conversationId",
            element: <Chat />
          },
          {
            path: "/profile",
            element: <Profile />
          },
          {
            path: "/profile/:uid",
            element: <Profile />
          },
        ]
      },]

  },

]);


export default router;