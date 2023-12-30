import React from 'react'
import Typography from '@mui/material/Typography'

export const Headings = ({ title }) => {
    return (
        <Typography variant="h3" gutterBottom align="center">
            {title}
        </Typography>
    )
}
