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
import { boardState, memoState } from "../../../store"
import MemoTextArea from "../components/memoTextArea"

const MakingStep = () => {

    const board = useRecoilValue(boardState)
    const $memo = useRef()
    const [memo, setMemo] = useRecoilState(memoState)
    const [selectedOption, setSelectedOption] = useState(0)
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
        
        navigate(-1)
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
            <MemoTextContainer background={memo.background} onClick={onClickMemoTextZone}>
                <MemoTextArea ref={$memo} text={memo.text} onChange={onChangeText} />
                <MemoTextIndicator>{memo.text.length}/50</MemoTextIndicator>
            </MemoTextContainer>
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
                                    ? <ColorButton color={el} onClick={() => onChangeBackground(el)} selected={memo.background===el} key={i} />
                                    : selectedOption === 1
                                        ? <ImageButton imageUrl={el} onClick={() => onChangeBackground(el)} selected={memo.background===el} key={i} />
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

const MemoTextContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: ${props => props.background.includes('http') ? `url(${props.background})` : props.background};
`

const MemoTextIndicator = styled.span`
    position: absolute;
    right: 1rem;
    bottom: 1rem;
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