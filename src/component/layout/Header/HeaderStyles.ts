import styled from 'styled-components';
import { mainBgColor, subBgColor, subColor } from '../../../modules/constain/color';
import { headerHeight } from '../../../modules/constain/itemSize';
export const HeaderContainer = styled.header`
    display: flex;
    width: 100%;
    justify-content:space-between;
    align-items: center;
    height: ${headerHeight}px;
    box-shadow: 0px 1px 3px ${subColor};
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
        top: 57px;
        left:0;
        background-color: ${mainBgColor};
        max-height:400px;
        width:100%;
        overflow-y:hidden;
        border:1px solid ${subBgColor};
        border-top:none;
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