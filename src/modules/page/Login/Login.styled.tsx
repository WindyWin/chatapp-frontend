import styled from "styled-components";
import { subBgColor } from "../../../constain/color";




export const LoginContainer = styled.form`
margin: 10% auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    background-color: ${subBgColor};
    box-shadow: 2px 2px 5px #333;

/* 
    input:has(invalid){
        animation: shake 0.5s;
        
    }   


    @keyframes shake{
        0%{
            transform: translateX(0);
        }
        25%{
            transform: translateX(-10px);
        }
        50%{
            transform: translateX(10px);
        }
        75%{
            transform: translateX(-10px);
        }
        100%{
            transform: translateX(0);
        }
    } */
`

