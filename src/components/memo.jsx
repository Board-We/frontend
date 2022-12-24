import { useEffect, useState } from "react"
import { useRef } from "react"
import styled from "styled-components"

const Memo = ({ text, onChangeText, color = "black", background = "white", size, children }) => {

    const [innerText, setInnerText] = useState("")
    const $memo = useRef()

    useEffect(() => {
        console.log(text, color, background)
    }, [])

    const onChangeMemoTextTA = (e) => {
        const newText = e.target.innerText
        if (newText.length > 100 || newText.split('\n').length > 5) {
            e.target.innerText = innerText
            return
        }

        setInnerText(newText)
        onChangeText(newText);
    }

    return (
        <ComponentWrapper
            ref={$memo}
            size={size}
            color={color}
            background={background}
            onInput={onChangeMemoTextTA}
            contentEditable={onChangeText && true}
            suppressContentEditableWarning={true}
            placeholder={"남기고 싶은 내용을\n마음껏 작성해주세요!"}
            disabled={onChangeText && true}
        >
            {
                onChangeText && true ? text : null
            }
            {children}
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.color};
    background: ${props => props.background.includes('http' || 'base64') ? `url(${props.background})` : props.background};
    width: ${props => props.size};
    height: ${props => props.size};
    text-align: center;
    white-space: pre-wrap;
    word-break: break-all;
    resize: none;
    border: 0;
    outline: 0;
    overflow: hidden;
    word-break: break-word;
    :disabled{
        background-color: inherit;
        color: inherit;
    }
`

export default Memo