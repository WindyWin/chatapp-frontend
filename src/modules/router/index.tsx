import { Children } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import ClientLayout from "../../component/layout";
import AuthProvider from "../context/AuthProvider";
import { Home, Login, NotFound, Register } from "../page";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
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
          }
        ]
      },]

  },

]);


export default router;