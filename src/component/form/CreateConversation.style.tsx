//@ts-nocheck
import styled from "styled-components";

const FormContainer = styled.div`
    display: ${props => props.show ? "flex" : "none"};
    top:0;
    left:0;
    right:0;
    bottom:0;
    position:fixed;
    z-index:1;
    justify-content:center;
    align-items:center;
    .background{
        background-color: rgba(0,0,0,0.5);
        position:fixed;
        z-index:1;
        top:0;
        left:0;
        right:0;
        bottom:0;
    }
    form{
        position: relative;
        z-index:2;
        background-color: #f5f5f5;
        padding: 40px;
        width:500px;
        display: flex;
        flex-direction: column;
        gap:10px
    }

    form input[type="file"]{
        display: none;
    }

    form .upload-label{
        cursor: pointer;
    }
    .search-user{
        position: relative;
    }
    .search-user .search-user-result{
        position: absolute;
        display:flex;
        z-index:2;
        top:100%;
        padding: 10px;
        background-color: #f5f5f5;
        max-height:180px;
        overflow-y: scroll;
        left: 0;
        width:100%;
        gap:10px;
        flex-direction: column;
    }

    .search-user .user-search-item{
        display:flex;
        align-items:center;
        justify-content: start;
        gap:10px;
        padding:10px;
        cursor:pointer;
        width:100%;
    }
    .search-user .user-search-item:hover{
        background-color: #f0f0f0;
    }
    `

export { FormContainer };

