import React, { useState } from "react"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import styled from "styled-components"
import FooterButton from "../../../components/buttons/FooterButton"
import ImageButton from "../../../components/buttons/ImageButton"
import { boardState, memoState } from "../../../store"

const MakingStep = ({ }) => {

    const board = useRecoilValue(boardState)
    const $memo = useRef()
    const [memo, setMemo] = useRecoilState(memoState)
    const [selectedOption, setSelectedOption] = useState(0)
    const navigate = useNavigate()

    const options = [
        { imgUrl: "https://cdns.iconmonstr.com/wp-content/releases/preview/2015/240/iconmonstr-paint-bucket-10.png", text: "색상" },
        { imgUrl: "https://st3.depositphotos.com/6628792/14552/v/450/depositphotos_145521931-stock-illustration-text-mini-line-icon.jpg", text: "종류" },
        { imgUrl: "https://thumbs.dreamstime.com/b/sticker-icon-laugh-emoji-black-simple-glyth-color-cute-vector-design-illustration-web-icons-graphics-146773607.jpg", text: "스티커" },
    ]

    const onChangeText = (e) => {
        const newText = e.target.value

        if (newText.length > 50 || newText.split('\n').length > 5) return
        setMemo({ ...memo, text: newText })
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
            <MemoTextContainer background={board.background} onClick={onClickMemoTextZone}>
                <MemoTextTA ref={$memo} value={memo.text} onChange={onChangeText} lineHeight={memo.text.split('\n').length} />
                <MemoTextIndicator>{memo.text.length}/50</MemoTextIndicator>
            </MemoTextContainer>
            <OptionContainer>
                <OptionMenuContainer>
                    {
                        options.map((el, i) => {
                            return <ImageButton imageUrl={el.imgUrl} text={el.text} selected={selectedOption === i} onClick={() => { onClickOption(i) }} key={i} />
                        })
                    }
                </OptionMenuContainer>
                <OptionValueContainer>

                </OptionValueContainer>
            </OptionContainer>
            <FooterButton text={"완료"} disabled={memo.text.length === 0} color={"#3A3A3A"} fontColor={"#FFFFFF"} />
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    
`

const MemoTextContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vw;
    background: ${props => props.background.includes('http') ? `url(${props.background})` : props.background};
`

const MemoTextTA = styled.textarea`
    height: ${props => `${props.lineHeight + 0.5}rem`};
    font-size: 1rem;
    line-height: 1rem;
    text-align: center;
    resize: none;
    border: 0;
    width: 80%;
    background: transparent;
    outline: 0;
    overflow: hidden;
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
`

const OptionMenuContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0.25rem 1rem;
`

const OptionValueContainer = styled.div`
    display: inline-table;
    width: 100%;
    padding: 0.25rem 1rem;
    background-color: #EEEEEE;
    height: 100%;
`

export default MakingStep