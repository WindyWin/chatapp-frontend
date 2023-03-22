import { Grid } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import { headerHeight } from "../../constain/itemSize";
import ConversationsContainer from "../core/ConversationsContainer";
import CreateConversation from "../form/CreateConversation";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";


const Main = styled.main`
  height: calc(100vh - ${headerHeight}px);
`

function Layout() {

  if (!localStorage.getItem('accessToken')) {
    return <Navigate to='/login' />;
  }

  return <div className="layout">
    <Header />
    <Main>
      <Grid container sx={{ height: 1 }} >
        <Grid item xs={3}>
          <ConversationsContainer />

        </Grid>
        <Grid item xs={7}>
          <Outlet />
        </Grid>
        <Grid item xs={2}>

        </Grid>

      </Grid>
    </Main>
    {/* <Footer /> */}
  </div>

}
export default Layout;