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
        element: <Home />
      }
      ,
      {
        path: "/login",
        element: <Login />
      }]
  },

  {
    path: "*",
    element: <NotFound />,
  }
]);


export default router;