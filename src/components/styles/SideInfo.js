import styled from "styled-components";

export default styled.div`
  background: ${props => props.theme.colors.cardBackground};
  position fixed;
  top: 10px;
  left: 10px;
  padding: 10px;
  width: 300px;
  border-radius: 10px;
  box-sizing: border-box;
`;