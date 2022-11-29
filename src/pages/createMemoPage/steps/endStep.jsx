import React from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import styled from "styled-components"
import ChipButton from "../../../components/buttons/chipButton"
import Description from "../../../components/label/description"
import SmallTitle from "../../../components/label/smallTitle"
import Tag from "../../../components/label/tag"
import ServiceNameHeader from "../../../components/layout/headers/serviceNameHeader"
import { boardState, memoState } from "../../../store"
import MemoTextArea from "../components/memoTextArea"

const EndStep = () => {

    const board = useRecoilValue(boardState)
    const memo = useRecoilValue(memoState)
    const navigate = useNavigate()

    const onClickMoreMemo = () => {
        navigate("/board/onWrite")
    }

    return (
        <PageWrapper>
            <ServiceNameHeader />
            <BoardArea background={board.background}>
                <BoardInfoContainer>
                    <SmallTitle text={board.name} />
                    <TagWrapper>
                        {
                            board.tags.map(el => {
                                return (
                                    <Tag text={`#${el}`} size="small" key={el} />
                                )
                            })
                        }
                    </TagWrapper>
                    <Description text={board.description} size="small" />
                </BoardInfoContainer>
                <MemoTextContainer background={memo.style.background} color={memo.style.textColor}>
                    <MemoTextArea text={memo.text} disabled={true}/>
                </MemoTextContainer>
            </BoardArea>
            <SmallTitle>롤링페이퍼가 작성되었어요!</SmallTitle>
            <Description size={"medium"}>이 롤링페이퍼는 {board.attachableTerm[0]}에 공개됩니다.</Description>
            <Alertcontainer>
                {/* <ChipButton flat fit color={"black"} background={"#E8E8E8"} text={"인기보드 보기"} onClick={onClickTopBoard}></ChipButton> */}
                {/* <ChipButton flat fit text={"롤링페이퍼 더 붙이기"} onClick={onClickMoreMemo} /> */}
                <ChipButton flat background="#5B5B5B" width={"80%"} text={"롤링페이퍼 더 붙이기"} onClick={onClickMoreMemo} />
            </Alertcontainer>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`

const BoardArea = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    max-width: 600px;
    max-height: 600px;
    padding: 3rem 0;
    margin-bottom: 1.75rem;
    line-height: 1.75rem;
    height: fit-content;
    background: ${props => props.background.includes('http') ? `url(${props.background})` : props.background};
`

const BoardInfoContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 1rem;
    text-align: left;
`

const MemoTextContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 80vw;
    background: ${props => props.background.includes('http') ? `url(${props.background})` : props.background};
    color: ${props => props.color};
    padding: 1rem; // padding value of text area
    border-radius: 0.5rem;
    margin: 1rem;
`

const TagWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const Alertcontainer = styled.div`
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 1.5rem 0;
`

export default EndStep