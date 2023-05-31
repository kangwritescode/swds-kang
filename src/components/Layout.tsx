import { Container } from '@mui/material'
import React from 'react'

interface LayoutProps {
    children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default Layout