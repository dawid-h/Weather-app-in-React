import styled from "styled-components";

export default styled.button`
  background: ${props => props.chosen ?
    props.theme.colors.chosenBackground :
    props.theme.colors.cardBackground};
  color: ${props => props.theme.colors.textColor};
  margin-top: 24px;
  margin-right: 10px;
  max-width: 100%;
  border: none;
  line-height: 36px;
  padding: 0 12px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
`;