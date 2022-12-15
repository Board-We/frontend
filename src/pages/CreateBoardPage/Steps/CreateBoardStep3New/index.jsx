import { useState } from "react"
import { useEffect, useRef } from "react"
import { useRecoilValue } from "recoil"
import styled from "styled-components"
import ChipButton from "../../../../components/buttons/chipButton"
import Description from "../../../../components/label/description"
import SmallTitle from "../../../../components/label/smallTitle"
import { boardState } from "../../../../store"

const CreateBoardStep3 = () => {
    const board = useRecoilValue(boardState)
    const $component = useRef()
    const $buttonArea = useRef()
    const $boardArea = useRef()
    const $boardDescription = useRef()
    const [heightOfBoard, setHeightOfBoard] = useState(0)
    const [heightOfMemoArea, setHeightOfMemoArea] = useState(0)

    useEffect(() => {
        const componentHeight = $component.current.offsetHeight
        const buttonHeight = $buttonArea.current.offsetHeight

        setHeightOfBoard(componentHeight - buttonHeight)
    })

    useEffect(() => {
        const bottomOfBoardDescription = $boardDescription.current.offsetTop - $component.current.offsetTop + $boardDescription.current.clientHeight
        const boardAreaHeight = $boardArea.current.clientHeight

        setHeightOfMemoArea(boardAreaHeight - bottomOfBoardDescription)
    }, [heightOfBoard])

    const getMemos = () => {
        const result = []

        board.memoBackground.forEach((el, i) => {
            result.push(<SampleMemo background={el} color={board.memoColors[i]} key={el + i}>aaa</SampleMemo>)
        })

        for (let i = 0; i < 6 - board.memoBackground.length; i++) {
            result.push(<SampleMemo background={board.memoBackground[0]} color={board.memoColors[0]} key={`sampleMemo${i}`}>aaa</SampleMemo>)
        }

        return result
    }

    const onClickSetBackground = () => {

    }

    const onClickSetMemoTheme = () => {

    }

    return (
        <ComponentWrapper ref={$component} >
            <SampleBoard ref={$boardArea} background={board.background} height={heightOfBoard}>
                <SmallTitle>{board.name}</SmallTitle>
                <Description ref={$boardDescription}>{board.description}</Description>
                <MemoArea>
                    <MemoGrid height={heightOfMemoArea}>
                        {getMemos()}
                    </MemoGrid>
                </MemoArea>
            </SampleBoard>
            <ButtonArea ref={$buttonArea}>
                <ChipButton flat text="배경" onClick={onClickSetBackground} />
                <ChipButton flat text="메모지" onClick={onClickSetMemoTheme} />
            </ButtonArea>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    width: inherit;
    height: inherit;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const SampleBoard = styled.div`
    width: 100%;
    height: ${props => props.height}px;
    border-radius: 0.5rem;
    background: ${props => props.background.includes('http') ? `url(${props.background})` : props.background};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 1rem;
    margin: 1rem;
`

const MemoArea = styled.div`
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
`

const MemoGrid = styled.div`
    max-height: ${props => props.height}px;
    overflow-y: scroll;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    &::-webkit-scrollbar{
        display: none;
    }
`

const SampleMemo = styled.div`
    width: 30vw;
    height: 30vw;
    max-width: 8rem;
    max-height: 8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    justify-self: center;
    background: ${props => props.background};
    border-radius: 0.5rem;
    font-size: 3.5vw;
`

const ButtonArea = styled.div`
    display: flex;
    flex-direction: row;
    height: fit-content;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
`

export default CreateBoardStep3