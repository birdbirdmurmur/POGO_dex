import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'primary.main',
                color: '#fff',
                py: 3,
                textAlign: 'center',
            }}
        >
            <Typography variant="body2" mt={1}>
                &copy; {new Date().getFullYear()} POGOdex by BirdBird. All Rights Reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
