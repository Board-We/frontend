import styled from "styled-components"
import ChipButton from "../../../../components/buttons/chipButton"

const CreateBoardStep3 = () => {
    return (
        <ComponentWrapper>
            <SampleBoard>
                board
            </SampleBoard>
            <ButtonArea>
                <ChipButton />
                <ChipButton />
            </ButtonArea>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    height: inherit;
    flex-grow: 1;
`

const SampleBoard = styled.div`
    
`

const ButtonArea = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`

export default CreateBoardStep3