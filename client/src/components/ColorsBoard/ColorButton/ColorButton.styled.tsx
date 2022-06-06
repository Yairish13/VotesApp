import styled from "styled-components";

export const StyledDivColorContainer = styled.div`
  height:300px;
  width: 300px;
  background-color: ${props => props.color ? props.color : "white"};
  position: relative;
//   flex-basis: calc(25% - 10px);
  margin: 5px;
  border: 1px solid;
  box-sizing: border-box;

  .square::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
  
  .square .content {
    position: absolute;
    top: 0; left: 0;
    height: 100%;
    width: 100%;
  }
`;
