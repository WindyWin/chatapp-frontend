// @ts-nocheck
import styled from 'styled-components';

const StatusDotStyled = styled.div`
    width: ${props => props.size ?? "10"}px;
    height: ${props => props.size ?? "10"}px;
    border-radius: 50%;
    background-color: ${props => props.status === "online" ? "green" : "grey"};
    border: 0.5px solid white;
`

function StatusDot(props) {
    return (
        <StatusDotStyled {...props} />
    )
}

export default StatusDot