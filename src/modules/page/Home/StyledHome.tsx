import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { isStyledComponent } from "@mui/styled-engine-sc";
import { subColor } from "../../constain/color";

const HomeContainer = styled(Grid)`
    height: 100%;
    .conversation-container{
        width:100%;
        height:100%;
        overflow-y: scroll;
        border-right: 1px 0px 5px ${subColor};
    }

`

export default HomeContainer;