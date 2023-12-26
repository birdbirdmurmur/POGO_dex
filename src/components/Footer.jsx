import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'primary.main',
                color: '#fff',
                py: 3,
                textAlign: 'center',
                height: '6vh',
            }}
        >
            <Typography variant="body2" mt={1}>
                &copy; {new Date().getFullYear()} POGOdex by BirdBird. All Rights Reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
