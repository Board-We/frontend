import React from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import styled from "styled-components"
import ChipButton from "../../../components/buttons/chipButton"
import ServiceNameHeader from "../../../components/layout/headers/serviceNameHeader"
import { boardState } from "../../../store"

const LandingStep = () => {

    const [board, setBoard] = useRecoilState(boardState)
    const navigate = useNavigate()

    const onClickMMP = () => {
        getMemoInfo(board.id)
        navigate("/memo/making")
    }

    const getMemoInfo = (boardId) => {
        const newBoard = {
            ...board,
            memoTypes: [
                "https://cdn1.vectorstock.com/i/1000x1000/56/85/yellow-memo-stick-concept-background-realistic-vector-17735685.jpg",
                "https://www.nicepng.com/png/detail/936-9366484_klik-op-bestand-voor-vergroting-memoblaadje-png.png",
                "https://thebusinesscommunication.com/wp-content/uploads/2019/11/Advantages-and-Disadvantages-of-Memo-in-Business.jpg"
            ],
            memoColors: ["red", "blue", "yellow"],
        }
        setBoard(newBoard)
    }

    return (
        <PageWrapper>
            <ServiceNameHeader />
            <BoardInfoContainer background={board.background}>
                <span>{board.name}</span>
                <span>{board.tags}</span>
                <span>{board.description}</span>
                <span>이 롤링페이퍼는 {board.openTerm.start}부터 확인가능합니다</span>
            </BoardInfoContainer>
            <InputContainer>
                <ChipButton onClick={onClickMMP} text={"롤링페이퍼 남기기"} flat />
            </InputContainer>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
`

const BoardInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${props => props.background.includes('http') ? `url(${props.background})` : props.background};
    width: 100%;
    height: 80%;
`

const InputContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`

export default LandingStep