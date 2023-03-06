import { Grid } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import { headerHeight } from "../../modules/constain/itemSize";
import ConversationContainer from "../core/ConversationContainer";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";


const Main = styled.main`
  height: calc(100vh - ${headerHeight}px);
`

function ClientLayout() {

  if (!localStorage.getItem('accessToken')) {
    return <Navigate to='/login' />;
  }

  return <div className="layout">
    <Header />
    <Main>
      <Grid container sx={{ height: 1 }} >
        <Grid item xs={3}>
          <ConversationContainer></ConversationContainer>
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
export default ClientLayout;