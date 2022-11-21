import React, { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import styled from "styled-components"
import ColorButton from "../../../components/buttons/colorbutton"
import FooterButton from "../../../components/buttons/FooterButton"
import ImageButton from "../../../components/buttons/ImageButton"
import StepHeader from "../../../components/layout/headers/stepHeader"
import AlertModal from "../../../components/modals/alertModal"
import { boardState, memoState } from "../../../store"
import MemoTextArea from "../components/memoTextArea"

const MakingStep = () => {

    const board = useRecoilValue(boardState)
    const $memo = useRef()
    const [memo, setMemo] = useRecoilState(memoState)
    const [selectedOption, setSelectedOption] = useState(0)
    const [alertOpen, setAlertOpen] = useState(false)
    const navigate = useNavigate()

    const options = [
        { imgUrl: "https://cdns.iconmonstr.com/wp-content/releases/preview/2015/240/iconmonstr-paint-bucket-10.png", text: "색상", value: ["white", "red", "blue", "green"] },
        { imgUrl: "https://st3.depositphotos.com/6628792/14552/v/450/depositphotos_145521931-stock-illustration-text-mini-line-icon.jpg", text: "종류", value: ["white", "red", "blue", "green"] },
        { imgUrl: "https://thumbs.dreamstime.com/b/sticker-icon-laugh-emoji-black-simple-glyth-color-cute-vector-design-illustration-web-icons-graphics-146773607.jpg", text: "스티커" },
    ]

    useEffect(() => {
        const initMemoBackground = options[0].value[0]
        setMemo({ ...memo, background: initMemoBackground })
    }, [])

    const onChangeText = (e) => {
        const newText = e.target.value

        if (newText.length > 50 || newText.split('\n').length > 5) return
        setMemo({ ...memo, text: newText })
    }

    const onChangeBackground = (newbackground) => {
        setMemo({ ...memo, background: newbackground })
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

    const onClickOption = (option) => setSelectedOption(option)

    const onClickMakeMemo = () => {
        navigate("/memo/end")
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
                <MemoTextContainer background={memo.background} onClick={onClickMemoTextZone}>
                    <MemoTextArea ref={$memo} text={memo.text} onChange={onChangeText} />
                    <MemoTextIndicator>{memo.text.length > 9 ? memo.text.length : ` ${memo.text.length}`}/50</MemoTextIndicator>
                </MemoTextContainer>
            </BoardArea>
            <OptionContainer>
                <OptionMenuContainer>
                    {
                        options.map((el, i) => {
                            if (el.value) return <ImageButton imageUrl={el.imgUrl} text={el.text} selected={selectedOption === i} onClick={() => { onClickOption(i) }} key={i} />
                        })
                    }
                </OptionMenuContainer>
                <OptionValueContainer>
                    {
                        options[selectedOption].value.map((el, i) => {
                            return (
                                selectedOption === 0
                                    ? <ColorButton color={el} onClick={() => onChangeBackground(el)} selected={memo.background === el} key={i} />
                                    : selectedOption === 1
                                        ? <ImageButton imageUrl={el} onClick={() => onChangeBackground(el)} selected={memo.background === el} key={i} />
                                        : null
                            )
                        })
                    }
                </OptionValueContainer>
            </OptionContainer>
            <FooterButton text={"완료"} disabled={memo.text.length === 0} color={"#3A3A3A"} fontColor={"#FFFFFF"} onClick={onClickMakeMemo} />
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
    width: 75%;
    height: 75%;
    background: ${props => props.background.includes('http') ? `url(${props.background})` : props.background};
`

const MemoTextIndicator = styled.pre`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
    bottom: 0;
    width: 4rem;
    height: 1.75rem;
    padding: 0.25rem;
    margin: 0.5rem;
    background-color: #0000007f;
    color: #ffffffcc;
    font-weight: bold;
    border-radius: 0.5rem;
`

const OptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    flex-grow: 1;
`

const OptionMenuContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0.25rem 1rem;
`

const OptionValueContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0.25rem 1rem;
    background-color: #EEEEEE;
    height: 100%;
    flex-grow: 1;
`

export default MakingStep