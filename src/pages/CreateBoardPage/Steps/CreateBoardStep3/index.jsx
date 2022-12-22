import { useState } from "react"
import { useEffect, useRef } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import styled from "styled-components"
import ChipButton from "../../../../components/buttons/chipButton"
import TapButton from "../../../../components/buttons/tapButton"
import Description from "../../../../components/label/description"
import SmallTitle from "../../../../components/label/smallTitle"
import { boardState, deviceScreenState } from "../../../../store"
import { theme } from "../../../../styles/theme"
import SelectModal from "./comopnents/selectModal"

const CreateBoardStep3 = () => {
    const [board, setBoard] = useRecoilState(boardState)
    const $component = useRef()
    const $buttonArea = useRef()
    const $boardArea = useRef()
    const $memoArea = useRef()
    const $boardDescription = useRef()
    const [heightOfBoard, setHeightOfBoard] = useState(0)
    const [heightOfMemoArea, setHeightOfMemoArea] = useState(0)
    const [memos, setMemos] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalTitle, setModalTitle] = useState()
    const deviceScreenSize = useRecoilValue(deviceScreenState);


    useEffect(() => {
        const componentHeight = $component.current.offsetHeight
        const buttonHeight = $buttonArea.current.offsetHeight

        setHeightOfBoard(componentHeight - buttonHeight)
    })

    useEffect(() => {
        const bottomOfBoardDescription = $boardDescription.current.offsetTop + $boardDescription.current.clientHeight - $component.current.offsetTop +
            Number(deviceScreenSize.rem.replace("px", "")) * 0.5;
        const boardAreaHeight = $boardArea.current.clientHeight

        setHeightOfMemoArea(boardAreaHeight - bottomOfBoardDescription)
        setMemos(getMemos())
    }, [heightOfBoard])

    useEffect(() => {
        setMemos(getMemos())
    }, [board.memoThemes])

    const getMemos = () => {
        const result = []
        const sampleText = [
            "우리 내년에도 친하게 지내자",
            "마라탕 모임 언제 가나요^^",
            "크리스마스 파티해서 맛있는거 먹자~~! 파티룸 찾아둘께",
            "선물 뭐 갖고싶어? 다 말해 사줄께ㅎㅎ -민지-",
            "테스트 메모",
            ""
        ]

        board.memoThemes.forEach((el, i) => {
            result.push(<SampleMemo size={$memoArea.current.clientWidth} background={el.memoBackground} color={el.memoTextColor} key={el + i}>{sampleText[i]}</SampleMemo>)
        })

        for (let i = 0; i < 6 - board.memoThemes.length; i++) {
            result.push(<SampleMemo size={$memoArea.current.clientWidth} background={board.memoThemes[0].memoBackground} color={board.memoThemes[0].memoTextColor} key={`sampleMemo${i}`}>{sampleText[i + board.memoThemes.length]}</SampleMemo>)
        }

        return result
    }

    const onClickSetBackground = () => {
        setModalTitle("배경")
        setIsModalOpen(true)
    }

    const onClickSetMemoTheme = () => {
        setModalTitle("메모지")
        setIsModalOpen(true)
    }

    const onCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <ComponentWrapper ref={$component} >
            <SampleBoard ref={$boardArea} height={heightOfBoard}>
                <MemoArea ref={$memoArea} background={board.background}>
                    <SmallTitle>{board.name}</SmallTitle>
                    <Description ref={$boardDescription}>{board.description}</Description>
                    <MemoGrid height={heightOfMemoArea}>
                        {memos}
                    </MemoGrid>
                </MemoArea>
            </SampleBoard>
            <ButtonArea ref={$buttonArea}>
                <TapButton isSelected={true} text="배경" onClick={onClickSetBackground} />
                <TapButton isSelected={true} text="메모지" onClick={onClickSetMemoTheme} />
            </ButtonArea>
            {
                isModalOpen &&
                <SelectModal open={isModalOpen} onClose={onCloseModal} title={modalTitle} option={modalTitle} board={board} setBoard={setBoard} />
            }
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    width: 100%;
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.25rem;
    background: ${theme.colors.grey_50};
`

const SampleBoard = styled.div`
    width: 100%;
    height: ${props => props.height}px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0 1rem;
    margin: 1rem;
    `

const MemoArea = styled.div`
    width:100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background: ${props => props.background.includes('base64') ? undefined : props.background};
    background-image: ${props => props.background.includes('base64') ? `url(${props.background})` : undefined};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 0.5px solid ${theme.colors.grey_30};
`

const MemoGrid = styled.div`
    max-height: ${props => props.height}px;
    width: 100%;
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
    width: ${props => props.size * 0.4}px;
    height: ${props => props.size * 0.4}px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    justify-self: center;
    background: ${props => props.background.includes('base64') ? 'white' : props.background};
    background-image: ${props => props.background.includes('base64') ? `url(${props.background})` : undefined};
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    color: ${props => props.color};
    border: 1px solid ${theme.colors.grey_40};
    border-radius: 0.5rem;
    font-size: ${props => props.size * 0.04}px;
`

const ButtonArea = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    height: fit-content;
    gap: 0.5rem;
    align-items: flex-start;
    justify-content: flex-start;
    padding-top: 0.5rem;
`

export default CreateBoardStep3