import React from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import CardMedia from '@mui/material/CardMedia'

export const AllPokemonView = ({ item, getZhType, getBgColor }) => {
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '100%',
            }}>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        {item.dexNr}. {item.names.Chinese}
                    </Typography>
                    <Chip
                        label={getZhType(item.primaryType.names.English)}
                        sx={{ backgroundColor: getBgColor(item.primaryType.names.English) }}
                    />
                    {item.secondaryType && (
                        <Chip
                            label={getZhType(item.secondaryType.names.English)}
                            sx={{ backgroundColor: getBgColor(item.secondaryType.names.English) }}
                        />
                    )}
                </CardContent>
                {/* some pokemon don't have an image */}
                {item.assets && item.assets.image ? (
                    <CardMedia
                        component="img"
                        image={item.assets.image}
                        alt={item.names.Chinese}
                        sx={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'contain',
                            marginRight: '10px',
                        }}
                    />
                ) : (
                    <CardMedia
                        component="img"
                        image='https://via.placeholder.com/80x80'
                        alt={item.names.English}
                        sx={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'contain',
                            marginRight: '10px',
                        }}
                    />
                )}
            </Card>
        </Grid>
    )
}
