import React, { useState } from 'react'
import Box from '@mui/material/Box'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import { allTypes, allGenerations } from '../data'

const CustomButtonGroup = ({ data }) => (
    <ButtonGroup
        variant="contained"
        aria-label="outlined button group"
        sx={{ m: '20px auto', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}
    >
        {data.map((item, index) => (
            <Button
                key={index}
                sx={{ marginRight: '5px', ...item.sx }}
            >
                {item.label}
            </Button>
        ))}
    </ButtonGroup>
)

export const FilterButtons = () => {
    const [showTypes, setShowTypes] = useState(false)
    const [showGeneration, setShowGeneration] = useState(false)


    const handleTypesClick = () => {
        setShowTypes(!showTypes)
    }

    const handleGenerationClick = () => {
        setShowGeneration(!showGeneration)
    }

    return (
        <Box>
            <ButtonGroup variant="contained" aria-label="outlined button group" sx={{ m: '20px auto' }}>
                <Button onClick={handleTypesClick}>Types</Button>
                <Button onClick={handleGenerationClick}>Generation</Button>
            </ButtonGroup>

            <Collapse in={showTypes} timeout="auto" unmountOnExit>
                <CustomButtonGroup data={allTypes.map((type) => ({
                    label: type.zhType,
                    sx: { backgroundColor: type.bgColor },
                }))} />
            </Collapse>

            <Collapse in={showGeneration} timeout="auto" unmountOnExit>
                <CustomButtonGroup data={allGenerations.map((gen) => ({
                    label: `${gen.zhName}(${gen.zhRegion})`,
                }))} />
            </Collapse>
        </Box>
    )
}