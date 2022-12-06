import React from "react"
import styled from "styled-components"
import ChipButton from "../../../components/buttons/chipButton"
import Subtitle from "../../../components/label/subtitle"

const BoardOnEnd = () => {
    return (
        <PageWrapper>
            <Subtitle>롤링페이퍼가 삭제되어 확인할 수 없습니다.</Subtitle>

            <ButtonContainer>
                <ChipButton>인기보드 보기</ChipButton>
                <ChipButton>롤링페이퍼 더 붙이기</ChipButton>
            </ButtonContainer>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
`

export default BoardOnEnd