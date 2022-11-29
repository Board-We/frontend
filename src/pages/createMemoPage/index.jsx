import React from 'react'
import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import EndStep from './steps/endStep'
import MakingStep from './steps/makingStep'

const CreateMemoPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate("/memo/making")
    }, [])

    return (
        <PageWrapper>
            <Routes>
                <Route path="/making" element={<MakingStep />} />
                <Route path="/end" element={<EndStep />} />
            </Routes>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
`

export default CreateMemoPage