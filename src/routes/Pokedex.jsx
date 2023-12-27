import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Container from '@mui/material/Container'

const Pokedex_URL = 'https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json'

export const Pokedex = () => {
    const [pokedex, setPokedex] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(Pokedex_URL)
            setPokedex(result.data)
            console.log(result.data)
        }

        fetchData()
    }, [])

    return (
        <>
            <Container maxWidth="lg" sx={{ height: '88vh', overflowY: 'scroll' }} >
                {pokedex.map((item, index) => {
                    if (item.generation === 1) {
                        return (
                            <div key={index}>
                                <h3>{item.dexNr}. {item.names.English}</h3>
                                {/* IMG cannot be loaded */}
                                {/* {item.assets.image && <img src={item.assets.image} alt={item.names.English} />} */}
                                <ul>
                                    <li>{item.primaryType.names.English}</li>
                                    {item.secondaryType && <li>{item.secondaryType.names.English}</li>}
                                </ul>
                            </div>
                        )
                    }
                })}
            </Container>
        </>
    )
}
