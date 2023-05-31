import { Container } from '@mui/material'
import React from 'react'
import { Toaster } from 'react-hot-toast'

interface LayoutProps {
    children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
    return (
        <Container>
            {children}
            <Toaster position='bottom-left' reverseOrder={false} />
        </Container>
    )
}

export default Layout