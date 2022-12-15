import styled from "styled-components"

const SelectModal = ({ open, onClose, children }) => {

    return (
        <ComponentWrapper open={open} onClick={onClose}>
            <ContentContainer>
                {children}
            </ContentContainer>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    position:absolute;
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    background: #ffffff00;
    visibility: ${props => props.open ? `visible` : `hidden`};
    z-index: 3;
`

const ContentContainer = styled.div`
    width: 100%;
    min-height: 40vh;
    left:0;
    bottom: 0;
    background: #DCDCDC;
`

export default SelectModal