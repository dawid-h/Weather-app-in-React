import styled from "styled-components";

export default styled.div`
  background: ${props => props.theme.colors.cardBackground};
  font-size: 6px;
  position fixed;
  top: 10px;
  left: 10px;
  padding: 10px;
  width: 120px;
  border-radius: 10px;
  transition: transform .2s;
  box-sizing: border-box;

  :hover {
    transform: scale(3.0) translate(40px, 40px);
  }
`;