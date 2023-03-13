import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";
import ConversationSection from "../../../component/core/ConversationSectionItem";
import { SocketContext } from "../../context/SocketProvider";
import { conversation } from "../../types";
import HomeContainer from "./StyledHome";

function Home() {
  // const socket = useContext(SocketContext);
  // socket.socket("users");


  return (

    <HomeContainer sx={{ padding: "40px" }}>
      <Typography>
        Click on the conversation to start chatting
      </Typography>
    </HomeContainer>
  );
}
export default Home;
