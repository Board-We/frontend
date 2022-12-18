import styled from "styled-components"
import { theme } from "../../styles/theme"

const TapButton = ({ text, isSelected = false, icon, fill = true, onClick }) => {
    return (
        <ComponentWrapper isSelected={isSelected} fill={fill} onClick={onClick}>
            {icon}{text}
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.25rem;
    width: fit-content;
    padding: 0.6875rem;
    font-size: 0.8125rem;
    color: ${props => props.isSelected ? theme.colors.black : theme.colors.grey_20};
    border: 1px solid ${props => props.isSelected ? theme.colors.primary : theme.colors.grey_50};
    border-radius: 2.25rem;
    background: ${props => props.isSelected ? props.fill ? theme.colors.primary_2 : `white` : `white`};
`

export default TapButton