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
    const [filteredPokedex, setFilteredPokedex] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')

    const fetchData = useCallback(async () => {
        try {
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
            setFilteredPokedex(updatedPokedex)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])


    const handleFilter = (filterType, filterValue) => {
        let filteredData = pokedex

        if (filterType === 'type') {
            filteredData = pokedex.filter((item) => {
                return (
                    item.primaryType.names.English.toLowerCase().includes(filterValue.toLowerCase()) ||
                    (item.secondaryType && item.secondaryType.names.English.toLowerCase().includes(filterValue.toLowerCase()))
                )
            })
        } else if (filterType === 'generation') {
            filteredData = pokedex.filter((item) => item.generation === Number(filterValue))
        }

        setFilteredPokedex(filteredData)
    }

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
            <FilterButtons onFilter={handleFilter} />
            {/* All Data */}
            <Grid container spacing={2}>
                {filteredPokedex
                    .filter((item) => item.names.Chinese.includes(searchTerm))
                    .map((item, index) => {
                        // if (item.generation === 1) {
                        return (
                            <AllPokemonView
                                key={index}
                                item={item}
                                getZhType={getZhType}
                                getBgColor={getBgColor}
                            />
                        )
                    }
                        // }
                    )}
            </Grid>
        </React.Fragment>
    )
}