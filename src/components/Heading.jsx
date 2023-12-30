import React from 'react'
import Typography from '@mui/material/Typography'

export const Heading = ({ title }) => {
    return (
        <Typography variant="h3" gutterBottom align="center">
            {title}
        </Typography>
    )
}
