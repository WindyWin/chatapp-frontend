import { lazy } from "react";
const Home = lazy(() => import("./Home/Home"));
const Login = lazy(() => import("./Login/Login"));
const NotFound = lazy(() => import("./NotFound/NotFound"));
const Register = lazy(() => import("./Register/Register"));
const Profile = lazy(() => import("./User/Profile"));
const Chat = lazy(() => import("./Chat/Chat"));


export { Home, NotFound, Login, Register, Chat, Profile };

