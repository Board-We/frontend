import { useEffect } from "react"
import { useState } from "react"
import { ReactComponent as Camera } from "../../../../../assets/camera.svg"
import styled from "styled-components"
import TapBar from "../../../../../components/buttons/tapBar"
import TapButton from "../../../../../components/buttons/tapButton"
import { theme } from "../../../../../styles/theme"
import ColorPalette from "./colorPalette"
import ColorSelectBar from "./colorSelectBar"


const SelectModal = ({ open, onClose, title, option, board, setBoard, children }) => {
    const [color, setColor] = useState('#fff')
    const [baseColor, setBaseColor] = useState('rgb(255, 0, 0)')
    const [selectedMemoIndex, setSelectedMemoIndex] = useState(0)
    const [selectedMenu, setSelectedMenu] = useState("bgImage")

    useEffect(() => {
        if (option === "메모지") {
            const memoTheme = board.memoThemes[selectedMemoIndex]
            switch (selectedMenu) {
                case "fontColor":
                    setColor(memoTheme.memoTextColor)
                    break;
                case "bgColor":
                    setColor(memoTheme.memoBackground.includes('http') ? '#fff' : memoTheme.memoBackground)
                    break;
            }
        } else if (option === "배경") {
            setColor(board.background.includes('http') ? '#fff' : board.background)
        }
    }, [option, selectedMenu, selectedMemoIndex])

    const onClickTapMenu = (e) => {
        setSelectedMenu(e)
    }

    const onClickTapBar = (e) => {
        setSelectedMemoIndex(e)
    }

    return (
        <ComponentWrapper open={open}>
            {
                option === "메모지" &&
                <MemoOptionContainer>
                    {
                        board.memoThemes.map((el, i) => {
                            return <TapBar
                                isSelected={selectedMemoIndex == i}
                                text={`메모지${i + 1}`}
                                onClick={() => onClickTapBar(i)}
                            />
                        })
                    }
                </MemoOptionContainer>
            }
            <MenuContainer>
                <TapButton text={`${option} 이미지`} isSelected={selectedMenu === "bgImage"} onClick={() => onClickTapMenu("bgImage")} />
                <TapButton text="배경 색" isSelected={selectedMenu === "bgColor"} onClick={() => onClickTapMenu("bgColor")} />
                {
                    option === "배경" ?
                        <TapButton text="글자 종류" isSelected={selectedMenu === "font"} onClick={() => onClickTapMenu("font")} />
                        : <TapButton text="글자 색" isSelected={selectedMenu === "fontColor"} onClick={() => onClickTapMenu("fontColor")} />
                }
            </MenuContainer>
            {
                (selectedMenu === "bgColor" || selectedMenu === "fontColor") &&
                <>
                    <ColorPaletteContainer>
                        <ColorPalette option={[option, selectedMenu, selectedMemoIndex]} color={color} setColor={setColor} baseColor={baseColor} board={board} setBoard={setBoard} />
                    </ColorPaletteContainer>
                    <ColorSelectBarContainer>
                        <ColorSelectBar color={baseColor} setColor={setBaseColor} />
                    </ColorSelectBarContainer>
                </>
            }
            {
                selectedMenu == "bgImage" &&
                <BackgroundImageContainer>
                    {
                        option === "배경" ?
                            (board.background.includes('http') ? <BackgroundImage src={board.background} /> : <Camera />)
                            : board.memoThemes[selectedMemoIndex].memoBackground.includes('http') ?
                                <BackgroundImage src={board.memoThemes[selectedMemoIndex].memoBackground} />
                                : <Camera />
                    }
                </BackgroundImageContainer>
            }
            <Footer>
                <div onClick={onClose}>x</div>
                <div>{title}</div>
                <div onClick={onClose}>v</div>
            </Footer>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    position:absolute;
    left:0;
    bottom: 0;
    min-height: 10vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    background: #FFFFFF;
    visibility: ${props => props.open ? `visible` : `hidden`};
    z-index: 3;
`

const MemoOptionContainer = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    gap: 0;
    border-bottom: 1px solid ${theme.colors.grey_40};
    width: 100%;
    padding-top:0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
`

const MenuContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.75rem;
`

const ColorPaletteContainer = styled.div`
    width: 100%;
    min-height: 7rem;
    height: 100%;
    padding: 0.75rem;
`

const ColorSelectBarContainer = styled.div`
    width: 100%;
    height: 2.5rem;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
`

const BackgroundImageContainer = styled.div`
    width: 100%;
    height: max-content;
    max-height: 12rem;
    display: flex;
    align-items: center;
    justify-content: center;
`

const BackgroundImage = styled.img`
    max-height: 12rem;
`

const Footer = styled.div`
    background: transparent;
    width: 100%;
    height: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
`

export default SelectModal