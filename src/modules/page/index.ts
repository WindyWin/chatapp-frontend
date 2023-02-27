import { lazy } from "react";
const Home = lazy(() => import("./Home/Home"));
const Login = lazy(() => import("./Login/Login"));
const NotFound = lazy(() => import("./NotFound/NotFound"));




export { Home, NotFound, Login };

