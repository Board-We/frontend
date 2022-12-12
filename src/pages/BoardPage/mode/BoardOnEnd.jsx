import React from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import ChipButton from "../../../components/buttons/chipButton"
import SmallTitle from "../../../components/label/smallTitle"

const BoardOnEnd = () => {

    const navigate = useNavigate()

    const onClickNewBoard = () => {
        navigate("/board/new")
    }

    const onClickExplore = () => {
        navigate("/")
    }

    return (
        <PageWrapper>
            <SmallTitle>롤링페이퍼의 확인기간이 마감되었습니다.</SmallTitle>
            <OnEndImage />
            <ButtonContainer>
                <ChipButton flat width="100%" background="#FDC62E" color="black" onClick={onClickNewBoard}>새 보드 만들기</ChipButton>
                <ChipButton flat width="100%" background="#EFF3F4" color="black" onClick={onClickExplore}>다른 보드 탐색하기</ChipButton>
            </ButtonContainer>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: inherit;
`
const OnEndImage = styled.img`
    width: 65vw;
    height: 65vw;
    max-width: 400px;
    max-height: 400px;
`

const ButtonContainer = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: flex-end;
    align-items: center;
    padding: 1rem;
    gap: 0.5rem;
`

export default BoardOnEnd