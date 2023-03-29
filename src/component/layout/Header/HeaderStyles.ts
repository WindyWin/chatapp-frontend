import styled from 'styled-components';
import { mainBgColor, subBgColor, subColor } from '../../../constain/color';
import { headerHeight } from '../../../constain/itemSize';
export const HeaderContainer = styled.header`
    display: flex;
    width: 100%;
    justify-content:space-between;
    align-items: center;
    height: ${headerHeight}px;
    box-shadow: 0px 1px 3px ${props => props.theme.shadowColor};
    & .header__left,& .header__right{
        width:300px;
        display:flex;
    }

    .header__left{
        margin-left: 3rem;
    }
    .header__mid{
        width:600px;
        padding: 1rem 0;
        position: relative;
    }
    .header__mid .input__search-user{
        width:100%;
    }
    .header__mid #Search-menu{
        position: absolute;
        z-index: 1;
        top: 57px;
        left:0;
        background-color: ${props => props.theme.background};
        max-height:400px;
        width:100%;
        overflow-y:hidden;
        border:1px solid ${props => props.theme.shadowColor};
        border-top:none;
        .overlay{
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            z-index:0;
            
        }
    }
    .header__right{
        margin-right: 3rem;
        gap:1.2rem;
        justify-content:end;
    }
    .header__right i{
        font-size:24px;
        cursor: pointer;
    }
    .header__right .btn-container{
        display:flex;
        justify-content:center;
        align-items:center;
    }
    

`