import styled from "styled-components";

export const StyledDivProgressbarContainer = styled.div`
bottom: 0px;
right: 0px;
left: 0px;
height: 30;
width: 100%;
background-color: whitesmoke;
border-radius: 40px;
position: absolute;
`
export const StyledDivProgressbar = styled.div`
borderRadius: 40;
text-align: end;
`

export const StyledSpanProgressbarStatus = styled.span`
padding: 6px;
color:black;
font-weight: 900;
`



// width:${props => 200 * (props.votes/props.maxVotes)};
