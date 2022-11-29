import React from 'react'
import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import ServiceNameHeader from '../../components/layout/headers/serviceNameHeader'
import Board404 from './mode/Board404'
import BoardOnEnd from './mode/BoardOnEnd'
import BoardOnOpen from './mode/BoardOnOpen'
import BoardOnWaitOpen from './mode/BoardOnWaitOpen'
import BoardOnWaitWrite from './mode/BoardOnWaitWrite'
import BoardOnWrite from './mode/BoardOnWrite'

const BoardPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        // navigate("/board/onWaitWrite")
    }, [])

    return (
        <PageWrapper>
            <div>board route</div>            
            <Routes>
                <Route path="/onWaitWrite" element={<BoardOnWaitWrite/>} />
                <Route path="/onWrite" element={<BoardOnWrite/>} />
                <Route path="/onWaitOpen" element={<BoardOnWaitOpen/>} />
                <Route path="/onOpen" element={<BoardOnOpen/>} />
                <Route path="/onEnd" element={<BoardOnEnd/>} />
                <Route path="/404" element={<Board404/>} />
            </Routes>
        </PageWrapper >
    )
}

const PageWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
`

export default BoardPage