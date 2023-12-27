import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'

const URL = 'https://pokemon-go-api.github.io/pokemon-go-api/api/types.json'

export const Types = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(URL)
                setData(response.data)
            } catch (error) {
                console.log('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <>
            <Typography variant="h3" gutterBottom align="center">
                Types
            </Typography>
            <Grid container spacing={3}>
                {data.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h5" color="primary" gutterBottom>
                                    主動方：{item.type}
                                </Typography>
                                <Divider />
                                <Typography variant="subtitle1" gutterBottom>
                                    打誰傷害減半： {item.halfDamageFrom.join(', ')}
                                </Typography>
                                <Divider />
                                <Typography variant="subtitle1" gutterBottom>
                                    打誰無效： {item.noDamageFrom.join(', ')}
                                </Typography>
                                <Divider />
                                <Typography variant="subtitle1" gutterBottom>
                                    被誰剋： {item.doubleDamageFrom.join(', ')}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}