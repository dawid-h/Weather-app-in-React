import styled from "styled-components";

export default styled.div`
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.textColor};
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 12px;
  box-sizing: border-box;
`;