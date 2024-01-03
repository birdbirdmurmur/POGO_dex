import React, { useState } from 'react'
import Box from '@mui/material/Box'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import { allTypes, allGenerations } from '../data'

const CustomButtonGroup = ({ items, onClick }) => (
    <ButtonGroup
        variant="contained"
        aria-label="outlined button group"
        sx={{ m: '20px auto', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}
    >
        {items.map((item, index) => (
            <Button
                key={index}
                sx={{ marginRight: '5px', ...item.sx }}
                onClick={() => onClick(item.enType || item.id)}
            >
                {item.label}
            </Button>
        ))}
    </ButtonGroup>
)

export const FilterButtons = ({ onFilter }) => {
    const [showTypes, setShowTypes] = useState(false)
    const [showGeneration, setShowGeneration] = useState(false)

    const handleTypesClick = () => {
        setShowTypes(!showTypes)
    }

    const handleGenerationClick = () => {
        setShowGeneration(!showGeneration)
    }

    const handleFilterBtnClick = (filterType, filterValue) => {
        onFilter(filterType, filterValue)
    }

    return (
        <Box>
            <ButtonGroup variant="contained" aria-label="outlined button group" sx={{ m: '20px auto' }}>
                <Button onClick={handleTypesClick}>Types</Button>
                <Button onClick={handleGenerationClick}>Generation</Button>
            </ButtonGroup>

            <Collapse in={showTypes} timeout="auto" unmountOnExit>
                <CustomButtonGroup items={allTypes.map((type) => ({
                    enType: type.enType,
                    label: type.zhType,
                    sx: { backgroundColor: type.bgColor },
                }))}
                    onClick={(value) => handleFilterBtnClick('type', value)}
                />
            </Collapse>

            <Collapse in={showGeneration} timeout="auto" unmountOnExit>
                <CustomButtonGroup items={allGenerations.map((gen) => ({
                    id: gen.id,
                    label: `${gen.zhName}(${gen.zhRegion})`,
                }))}
                    onClick={(value) => handleFilterBtnClick('generation', value)}
                />
            </Collapse>
        </Box>
    )
}