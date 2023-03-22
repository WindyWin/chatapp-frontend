import styled from "styled-components"

const MyProfileStyled = styled.div`
padding: 20px;
    & .profile-top{
        display:flex;
        gap:20px;

    }



    & .profile-top .profile_avatar-container{
        position: relative;
        overflow:hidden;
        
        height:100px;
        width:100px;
        & label{
            position: absolute;
            z-index: 2;
            display:none;
            bottom: 5px;
            left: 50%;
            cursor: pointer;
            transform: translate(-50%, 0);
        }
        &:hover label, &:hover::before{
            display:block;
        }
        &::before{
            content: "";
            position: absolute;
            display:none;
            z-index: 1;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-image: linear-gradient(0,#00000090,#00000000);
        }


    }


    & .profile-top .profile-info{
        display:flex;
        justify-content:center;
        flex-direction:column;
    }


`

export default MyProfileStyled