import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { user } from '../../modules/types'

const UserSearchItemStyle = styled.div`
    display:flex;
    align-items:center;
    justify-content: start;
    gap:10px;
    padding:10px;
    cursor:pointer;
    &:hover{
        background-color: #f0f0f0;
    }
    width:100%;
`

function UserSearchItem({ user }: { user: user }) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/profile/${user.uid}`)
    }
    return (
        <UserSearchItemStyle onClick={handleClick} className="user-search-item" >
            <Avatar src={user.avatar} ></Avatar>
            <div className="item-info">
                <div className="item-info__username">{user.username}</div>
                <div className="item-info__email">{user.email}</div>
            </div>
        </UserSearchItemStyle>

    )
}

export default UserSearchItem