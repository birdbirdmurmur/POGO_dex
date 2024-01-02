import React, { useState, useEffect, useCallback, useMemo } from 'react'

import Grid from '@mui/material/Grid'

import { Heading } from '../components/Heading'
import { SearchBar } from '../components/SearchBar'
import { FilterButtons } from '../components/FilterButtons'
import { AllPokemonView } from '../components/AllPokemonView'
import { allTypes } from '../data'
import { fetchPokedex, fetchAllSpeciesData } from '../api/api'


export const Pokedex = () => {
    const [pokedex, setPokedex] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const fetchData = useCallback(async () => {
        const [pokedexData, speciesData] = await Promise.all([
            fetchPokedex(),
            fetchAllSpeciesData(),
        ])

        const updatedPokedex = pokedexData.map((item, index) => ({
            ...item,
            names: {
                ...item.names,
                Chinese: speciesData[index].names[3].name,
            }
        }))

        setPokedex(updatedPokedex)
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const filteredPokedex = useMemo(() => {
        return pokedex.filter((item) => {
            const matchesSearchTerm = item.names.Chinese.toLowerCase().includes(searchTerm.toLowerCase())
            // 篩選types&generation
            const matchesType = item.primaryType.names.English.toLowerCase().includes(searchTerm.toLowerCase())

            return matchesSearchTerm || matchesType
        })
    }, [pokedex, searchTerm])

    const getZhType = useCallback((str) => {
        const matchedType = allTypes.find((type) => type.enType === str.toLowerCase())
        return matchedType ? matchedType.zhType : str
    }, [])

    const getBgColor = useCallback((type) => {
        const matchedType = allTypes.find((t) => t.enType === type.toLowerCase())
        return matchedType ? matchedType.bgColor : '#17CCF0'
    }, [])

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
                            <AllPokemonView
                                key={index}
                                item={item}
                                getZhType={getZhType}
                                getBgColor={getBgColor}
                            />
                        )
                    }
                }
                )}
            </Grid>
        </React.Fragment>
    )
}