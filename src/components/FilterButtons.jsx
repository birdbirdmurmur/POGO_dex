import React, { useState } from 'react'
import Box from '@mui/material/Box'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'

export const FilterButtons = () => {
    const [showButtons, setShowButtons] = useState(false)

    const handleButtonClick = () => {
        setShowButtons(!showButtons)
    }

    return (
        <Box>
            <ButtonGroup variant="contained" aria-label="outlined button group" sx={{ m: '20px auto' }}>
                <Button onClick={handleButtonClick}>Types</Button>
                <Button onClick={handleButtonClick}>Generation</Button>
            </ButtonGroup>

            {showButtons && (
                <ButtonGroup variant="contained" aria-label="outlined button group" sx={{ m: '20px auto' }}>
                    <Button>Types</Button>
                    <Button>Generation</Button>
                </ButtonGroup>
            )}
        </Box>
    )
}
