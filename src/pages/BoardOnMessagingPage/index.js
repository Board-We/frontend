import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import styled from "styled-components"
import ChipButton from "../../components/buttons/chipButton"
import ServiceNameHeader from "../../components/layout/headers/serviceNameHeader"
import { boardState } from "../../store"

const BoardOnMessagingPage = () => {
    const [board, setBoard] = useRecoilState(boardState)
    const navigate = useNavigate()

    const onClickChipButton = () => {
        getBoardInfo()
        navigate('/mmp')
    }

    const getBoardInfo = () => {
        setBoard({
            ...board,
            memoTypes: [
                "https://cdn.pixabay.com/photo/2016/04/22/10/16/paper-1345510_960_720.jpg",
                "https://cdn.pixabay.com/photo/2018/04/11/09/04/paper-clip-3309924_960_720.png",
                "https://cdn.pixabay.com/photo/2016/05/20/14/14/open-spiral-notebook-1405082_960_720.png"
            ],
            memoColors: [
                "red",
                "green",
                "blue"
            ]
        })
    }


    return (
        <PageWrapper>
            <ServiceNameHeader />
            <BoardContainer background={board.background}>
                <BoardTitleText>{board.name}</BoardTitleText>
                <BoardDescriptionText>{board.description}</BoardDescriptionText>
            </BoardContainer>
            <PageFooter>
                <ChipButton
                    onClick={onClickChipButton}
                    text={"롤링 페이퍼 남기기"}
                    flat
                    color={"#5B5B5B"}
                    fontColor={"#FFFFFF"}
                />
            </PageFooter>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const BoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0 2rem;
    background: ${(props) => (props.background.includes('http') ? `url(${props.background})` : props.background)};
`;

const BoardTitleText = styled.span`
    margin-top: 8rem;
    font-size: 2rem;
`;

const BoardDescriptionText = styled.span`
    margin-top: 2rem;
    font-size: 1rem;
`;

const PageFooter = styled.div`
    position: absolute;
    bottom: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 12%;
    background-color: #dddddd;
`;

export default BoardOnMessagingPage
