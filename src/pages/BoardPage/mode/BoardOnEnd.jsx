import React from "react"
import styled from "styled-components"
import ChipButton from "../../../components/buttons/chipButton"
import SmallTitle from "../../../components/label/smallTitle"

const BoardOnEnd = () => {
    return (
        <PageWrapper>
            <SmallTitle>롤링페이퍼의 확인기간이 마감되었습니다.</SmallTitle>
            <OnEndImage />
            <ButtonContainer>
                <ChipButton>인기보드 보기</ChipButton>
                <ChipButton>롤링페이퍼 더 붙이기</ChipButton>
            </ButtonContainer>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const OnEndImage = styled.img`
    width: 65vw;
    height: 65vw;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: baseline;
`

export default BoardOnEnd