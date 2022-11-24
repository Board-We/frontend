import React, { forwardRef } from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const MemoTextArea = forwardRef(({ text = "", onChange, disabled = false }, ref) => {

    const [innerText , setInnerText] = useState("")

    const onChangeMemoTextTA = (e) => {
        const newText = e.target.innerText
        if (newText.length > 50 || newText.split('\n').length > 5) {
            e.target.innerText = innerText
            return
        }

        setInnerText(newText)
        onChange(newText);
    }

    return (
        <ComponentWrapper>
            <MemoTextTA ref={ref} onInput={onChangeMemoTextTA} suppressContentEditableWarning={true} contentEditable={!disabled} placeholder={"남기고 싶은 내용을\n마음껏 작성해주세요!"}></MemoTextTA>
        </ComponentWrapper>
    )
})

const ComponentWrapper = styled.div`
    
`

const MemoTextTA = styled.div`
    height: fit-content;
    font-size: 1rem;
    line-height: 1rem;
    text-align: center;
    resize: none;
    border: 0;
    width: 100%;
    background: transparent;
    outline: 0;
    overflow: hidden;
    :disabled{
        background-color: inherit;
        color: inherit;
    }
`

export default MemoTextArea