import styled from 'styled-components';
import { subColor } from '../../../modules/constain/color';
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
    

`