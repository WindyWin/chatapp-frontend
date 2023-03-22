import styled from "styled-components";
import { borderColor } from "../../constain/color";



const StyledConveration = styled.div`
    position: relative;
    height: 100%;
    z-index: 0;
    & .conversation-header{
        padding: 8px;
        border-bottom: 1px solid ${borderColor};
    }

    & .conversation-footer{
        position:absolute;
        z-index:0;
        padding:10px;
        border-top: 1px solid ${borderColor};
        width:100%;
        bottom:0;
    }
    & .conversation-footer form{
        display: flex;
    }
 

`

export default StyledConveration