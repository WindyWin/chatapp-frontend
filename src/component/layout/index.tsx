import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import { headerHeight } from "../../modules/constain/itemSize";
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
      <Outlet />
    </Main>
    {/* <Footer /> */}
  </div>

}
export default ClientLayout;