import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

const Pokedex_URL = 'https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json'

export const Pokedex = () => {
    const [pokedex, setPokedex] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(Pokedex_URL)
                setPokedex(response.data)
            } catch (error) {
                console.log('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    const filteredPokedex = pokedex.filter((item) =>
        item.names.English.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <>
            <Typography variant="h3" gutterBottom align="center">
                Pokedex
            </Typography>
            <TextField
                label="Search Pokemon"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
            <Grid container spacing={2}>
                {filteredPokedex.map((item, index) => {
                    if (item.generation === 1) {
                        return (
                            <Grid item xs={6} sm={4} md={3} key={index}>
                                <Card>
                                    <CardContent>
                                        <Typography>
                                            {item.dexNr}. {item.names.English}
                                        </Typography>
                                        {/* IMG cannot be loaded */}
                                        {/* {item.assets.image && <img src={item.assets.image} alt={item.names.English} />} */}
                                        <div>
                                            <Chip label={item.primaryType.names.English} />
                                            {item.secondaryType && (
                                                <Chip label={item.secondaryType.names.English} />
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    }
                })}
            </Grid>
        </>

    )
}
