import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { CardMedia } from '@mui/material'

import { Heading } from '../components/Heading'
import { SearchBar } from '../components/SearchBar'
import { FilterButtons } from '../components/FilterButtons'
import { allTypes } from '../data'

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

    const convertToChinese = (str) => {
        const matchedType = allTypes.find((type) => type.english === str.toLowerCase())
        return matchedType ? matchedType.zh : str
    }

    return (
        <React.Fragment>
            {/* Heading*/}
            <Heading title="Pokedex" />
            {/* SearchBar */}
            <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            {/* FilterButtons */}
            <FilterButtons />
            {/* All Data */}
            <Grid container spacing={2}>
                {filteredPokedex.map((item, index) => {
                    if (item.generation === 1) {
                        return (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    height: '100%',
                                }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 1 }}>
                                            {item.dexNr}. {item.names.English}
                                        </Typography>
                                        <Chip label={convertToChinese(item.primaryType.names.English)} />
                                        {item.secondaryType && (
                                            <Chip label={convertToChinese(item.secondaryType.names.English)} />
                                        )}
                                    </CardContent>
                                    {/* IMG cannot be loaded in Gen6 */}
                                    {item.assets.image &&
                                        <CardMedia
                                            component="img"
                                            image={item.assets.image}
                                            alt={item.names.English}
                                            sx={{
                                                width: '80px',
                                                height: '80px',
                                                objectFit: 'contain',
                                                marginRight: '10px',
                                            }}
                                        />
                                    }
                                </Card>
                            </Grid>
                        )
                    }
                })}
            </Grid>
        </React.Fragment>
    )
}
