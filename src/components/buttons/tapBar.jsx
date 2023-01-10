import styled from "styled-components";
import { theme } from "../../styles/theme";

const TapBar = ({ text, isSelected = false, icon, onClick, onRemove }) => {
  return (
    <ComponentWrapper isSelected={isSelected} onClick={onClick}>
      {text}
      {icon}
      {onRemove && <div>x</div>}
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.25rem;
  width: fit-content;
  padding: 0.6875rem 0.75rem;
  font-size: 0.8125rem;
  color: ${(props) =>
    props.isSelected ? theme.colors.primary : theme.colors.grey_20};
  border-bottom: ${(props) =>
    props.isSelected ? `2px solid ${theme.colors.primary}` : null};
  cursor: pointer;
  background: #ffffff;
  gap: 0.5rem;
`;

export default TapBar;
