// @ts-nocheck
import styled from 'styled-components';

const StatusDotStyled = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${props => props.status === "online" ? "green" : "red"};

`

function StatusDot({ status }: {
    status: "online" | "offline"
}) {
    return (
        <StatusDotStyled status={status} />
    )
}

export default StatusDot