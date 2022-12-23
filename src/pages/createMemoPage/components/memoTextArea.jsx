import React, { forwardRef } from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const MemoTextArea = forwardRef(({ text = "", onChange, disabled = false }, ref) => {

    const [innerText, setInnerText] = useState("")

    const onChangeMemoTextTA = (e) => {
        const newText = e.target.innerText
        if (newText.length > 100 || newText.split('\n').length > 5) {
            e.target.innerText = innerText
            return
        }

        setInnerText(newText)
        onChange(newText);
    }

    return (
        <ComponentWrapper>
            <MemoTextTA ref={ref} onInput={onChangeMemoTextTA} contentEditable={!disabled} suppressContentEditableWarning={true} placeholder={"남기고 싶은 내용을\n마음껏 작성해주세요!"}>
                {
                    disabled ? text : null
                }
            </MemoTextTA>
        </ComponentWrapper>
    )
})

const ComponentWrapper = styled.div`
    
`

const MemoTextTA = styled.div`
    height: fit-content;
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.875rem;
    text-align: center;
    white-space: pre-wrap;
    word-break: break-all;
    resize: none;
    border: 0;
    width: 100%;
    background: transparent;
    outline: 0;
    overflow: hidden;
    word-break: break-word;
    :disabled{
        background-color: inherit;
        color: inherit;
    }
`

export default MemoTextArea