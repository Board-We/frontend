import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import styled from "styled-components"
import ChipButton from "../../../components/buttons/chipButton"
import Description from "../../../components/label/description"
import Tag from "../../../components/label/tag"
import ServiceNameHeader from "../../../components/layout/headers/serviceNameHeader"
import { boardState } from "../../../store"
import Title from "../../../components/label/title"

const BoardOnWrite = () => {

    const [board, setBoard] = useRecoilState(boardState)
    const navigate = useNavigate()

    useEffect(()=>{
        console.log(new Date())
    })

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
            <BoardInfoContainer background={board.background}>
                <Title text={board.name} />
                <TagWrapper>
                    {
                        board.tags.map(el => {
                            return (
                                <Tag text={`#${el}`} key={el} />
                            )
                        })
                    }
                </TagWrapper>
                <Description text={board.description} />
                {/* <span>이 롤링페이퍼는 {board.openTerm.start}부터 확인가능합니다</span> */}
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
    align-items: flex-start;
    justify-content: flex-end;
    background: ${props => props.background.includes('http') ? `url(${props.background})` : props.background};
    width: 100%;
    height: 90%;
    padding: 2rem;
`

const TagWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0.5rem 0;
`

const InputContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`

export default BoardOnWrite