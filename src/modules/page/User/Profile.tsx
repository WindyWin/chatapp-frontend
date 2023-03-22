import { useParams } from 'react-router-dom'
import MyProfile from '../../../component/core/MyProfile'

function Profile() {
    const param = useParams()

    return (
        <MyProfile uid={param.uid} />
    )
}

export default Profile