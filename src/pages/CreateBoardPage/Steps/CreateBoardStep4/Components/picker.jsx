import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { theme } from "../../../../../styles/theme";

const Picker = ({ data, selectedData, setSelectedData }) => {

    const [index, setIndex] = useState(0)

    useEffect(() => {
        setIndex(data.indexOf(selectedData))
    }, [selectedData])

    const onClickData = (el) => {
        setSelectedData(el)
    }

    return (
        <ComponentWrapper >
            {index === 0 && <Entity />}
            {
                data.map((el, i) => {
                    return (
                        Math.abs(index - i) < 2 && <Entity onClick={() => onClickData(el)} isSelected={el === selectedData} isSingle={data.length === 1} key={el}>{el}</Entity>
                    )
                })
            }
            {index === data.length - 1 && <Entity />}
        </ComponentWrapper>
    )
}


const ComponentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    
`

const Entity = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.isSelected ? theme.colors.black : theme.colors.grey_30};
    height: 2rem;
    width: 4.5rem;
    font-size: 1rem;
    margin: 0 0.5rem;
    padding: 0.5rem 0;
    border: ${props => (props.isSelected && !props.isSingle) ? 1.5 : 0}px solid transparent;
    border-image: linear-gradient(to left, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 20%,rgba(0,0,0,1) 20.1%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 80.1%, rgba(0,0,0,0) 100%);
    border-image-slice: 1;
`

export default Picker