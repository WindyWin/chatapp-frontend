import { lazy } from "react";
const Home = lazy(() => import("./Home/Home"));
const Login = lazy(() => import("./Login/Login"));
const NotFound = lazy(() => import("./NotFound/NotFound"));
const Register = lazy(() => import("./Register/Register"));
const Conversation = lazy(() => import("./Conversation/Conversation"));
const Profile = lazy(() => import("./User/Profile"));



export { Home, NotFound, Login, Register, Conversation, Profile };

