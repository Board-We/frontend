import React, { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import styled from "styled-components"
import FooterButton from "../../../components/buttons/FooterButton"
import Subtitle from "../../../components/label/subtitle"
import StepHeader from "../../../components/layout/headers/stepHeader"
import MemoPaper from "../../../components/memoPaper"
import AlertModal from "../../../components/modals/alertModal"
import { boardState, memoState } from "../../../store"
import MemoTextArea from "../components/memoTextArea"

const MakingStep = () => {

    const board = useRecoilValue(boardState)
    const $memo = useRef()
    const [memo, setMemo] = useRecoilState(memoState)
    const [alertOpen, setAlertOpen] = useState(false)
    const navigate = useNavigate()

    const memoBackgroundOptions = {
        image: [

        ],
        color: [
            { background: "white", textColor: "black" },
            { background: "red", textColor: "white" },
            { background: "green", textColor: "white" },
            { background: "blue", textColor: "white" },
            { background: "orange", textColor: "white" },
            { background: "yellow", textColor: "black" },
        ]
    }

    useEffect(() => {
        const initMemoStyle = memoBackgroundOptions.image[0] ? memoBackgroundOptions.image[0] : memoBackgroundOptions.color[0]
        setMemo({ ...memo, style: initMemoStyle })
    }, [])

    const onChangeText = (text) => {
        const newText = text
        setMemo({ ...memo, text: newText })
    }

    const onClickBack = () => {
        setAlertOpen(true)
    }

    const goBack = () => {
        navigate(-1)
    }

    const cancelBack = () => {
        setAlertOpen(false)
    }

    const onClickMemoTextZone = () => {
        $memo.current.focus()
    }

    const onClickMakeMemo = () => {
        navigate("/memo/end")
    }

    const onClickMemoPaper = (option) => {
        setMemo({ ...memo, style: option })
    }

    return (
        <PageWrapper>
            <StepHeader title={"롤링페이퍼 작성하기"} onClick={onClickBack} />
            {
                alertOpen ?
                    <AlertModal open={alertOpen} buttonTextArray={["중단하기", "편집으로 돌아가기"]} onClickArray={[goBack, cancelBack]} text={"편집을 중단할까요?"} />
                    : null
            }
            <BoardArea background={board.background}>
                <MemoTextContainer background={memo.style.background} color={memo.style.textColor} onClick={onClickMemoTextZone}>
                    {memo.text.length == 0 ? <MemoPlaceHolder>남기고 싶은 내용을<br />마음껏 작성해주세요!</MemoPlaceHolder> : null}
                    <MemoTextArea ref={$memo} text={memo.text} onChange={onChangeText} />
                </MemoTextContainer>
                <MemoTextIndicator>{memo.text.length}/100</MemoTextIndicator>
            </BoardArea>
            <OptionArea>
                <Subtitle text={"메모지를 선택해주세요."} />
                <OptionContainer>
                    {
                        memoBackgroundOptions.image.map(el => {
                            return <Option key={el} onClick={() => onClickMemoPaper(el)}>{el}</Option>
                        })
                    }
                    {
                        memoBackgroundOptions.color.map(el => {
                            return <Option key={JSON.stringify(el)} onClick={() => onClickMemoPaper(el)}>
                                <MemoPaper
                                    background={el.background}
                                    text={"텍스트"}
                                    color={el.textColor}
                                    isSelected={JSON.stringify(el) === JSON.stringify(memo.style)} />
                            </Option>
                        })
                    }
                </OptionContainer>
            </OptionArea>
            <FooterButton text={"완료"} disabled={memo.text.length === 0} color={"#3A3A3A"} textColor={"#FFFFFF"} onClick={onClickMakeMemo} />
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`

const BoardArea = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vw;
    max-width: 700px;
    max-height: 700px;
    background: ${props => props.background.includes('http') ? `url(${props.background})` : props.background};
`

const MemoTextContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 80%;
    background: ${props => props.background.includes('http') ? `url(${props.background})` : props.background};
    color: ${props => props.color};
    border-radius: 0.5rem;
    padding: 0 1.25rem;
`

const MemoPlaceHolder = styled.span`
    width: 100%;
    opacity: 0.4;
    color: #000000;
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.875rem;
`

const MemoTextIndicator = styled.pre`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 2.5rem;
    bottom: 0.75rem;
    color: black;
    font-weight: 500;
    border-radius: 0.5rem;
    margin: 0;
`

const OptionArea = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: flex-start;
    padding: 0.5rem;
`

const OptionContainer = styled.ul`
    width: 100%;
    height: 100%;
    list-style: none;
    flex-grow: 1;
    margin: 0;
    padding: 0;
    margin-top: 1rem;
`

const Option = styled.li`
    position: relative;
    float: left;
    margin: 0.25rem;
`

export default MakingStep