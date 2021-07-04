import styled from "styled-components";

export default styled.div`
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.textColor};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr ${props => props.moreCols ? '1fr 1fr 1fr' : ''};
  justify-items: center;
  padding: 12px;
  box-sizing: border-box;
`;