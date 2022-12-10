import React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import Description from '../../../components/label/description'
import SmallTitle from '../../../components/label/smallTitle'
import Tag from '../../../components/label/tag'

const BoardBackground = ({ boardInfo, centerContent, backgroundRepeat }) => {

    useEffect(()=>{
        console.log(backgroundRepeat)
    }, [])

    return (
        <ComponentWrapper background={boardInfo.background} backgroundRepeat={backgroundRepeat}>
            <Blind />
            <CenterContentContainer>
                {centerContent}
            </CenterContentContainer>
            <ContentContainer>
                <SmallTitle color="white">{boardInfo.name}</SmallTitle>
                <Tags>
                    {
                        boardInfo.tags.map(el => {
                            return <Tag color="white" key={el}>{`#${el}`}</Tag>
                        })
                    }
                </Tags>
                <Description color={"white"}>{boardInfo.description}</Description>
            </ContentContainer>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 1.5rem;
    background: ${props => props.background.includes('http') ? `url(${props.background})` : props.background};
    background-position: center;
    background-size: cover;
    background-repeat: ${props => props.backgroundRepeat ? `repeat` : `no-repeat`};
    width: 100%;
    height: 100%;
    line-height: 2rem;
`

const Blind = styled.div`
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.3;
    z-index: 1;
`

const CenterContentContainer = styled.div`
    position: absolute;
    display: flex;
    left:0;
    top:0;
    width: inherit;
    height: inherit;
    align-items: center;
    justify-content: center;
    z-index: 2;
`

const ContentContainer = styled.div`
    padding: 0;
    margin:0;
    z-index: 2;
`

const Tags = styled.div`
    display: flex;
    flex-direction: row;
`

export default BoardBackground