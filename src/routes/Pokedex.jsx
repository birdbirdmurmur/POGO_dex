import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Grid from '@mui/material/Grid'

import { Heading } from '../components/Heading'
import { SearchBar } from '../components/SearchBar'
import { FilterButtons } from '../components/FilterButtons'
import { AllPokemonView } from '../components/AllPokemonView'
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

    const getZhType = (str) => {
        const matchedType = allTypes.find((type) => type.enType === str.toLowerCase())
        return matchedType ? matchedType.zhType : str
    }

    const getBgColor = (type) => {
        const matchedType = allTypes.find((t) => t.enType === type.toLowerCase())
        return matchedType ? matchedType.bgColor : '#17CCF0'
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
                    // if (item.generation === 1) {
                    return (
                        <AllPokemonView
                            key={index}
                            item={item}
                            getZhType={getZhType}
                            getBgColor={getBgColor}
                        />
                    )
                    // }
                })}
            </Grid>
        </React.Fragment>
    )
}
