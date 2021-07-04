import styled from "styled-components";

export default styled.div`
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.textColor};
  text-align: center;
  border: solid 1px black;
  place-self: center stretch;
  padding: 12px;
  box-sizing: border-box;
`;