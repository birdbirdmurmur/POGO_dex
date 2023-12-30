import React from 'react'
import TextField from '@mui/material/TextField'

export const SearchBar = ({ value, onChange }) => {
    return (
        <TextField
            label="Search Pokemon"
            variant="outlined"
            fullWidth
            value={value}
            onChange={onChange}
            sx={{ mt: '20px' }}
        />
    )
}
