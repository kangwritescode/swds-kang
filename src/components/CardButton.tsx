import { Box } from '@mui/material'
import React from 'react'

interface CardButtonProps {
    onClick: () => void,
    children: React.ReactNode
}

function CardButton({onClick, children}: CardButtonProps) {
    return (
        <Box
            onClick={onClick}
            height='100%'
            flexGrow={1}
            alignItems='center'
            justifyContent='center'
            display='flex'
            sx={{
                opacity: 0.5,
                ':hover': {
                    opacity: 1,
                },
            }}>
            {children}
        </Box>
    )
}

export default CardButton