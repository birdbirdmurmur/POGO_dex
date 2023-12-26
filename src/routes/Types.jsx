import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Container from '@mui/material/Container'

const URL = 'https://pokemon-go-api.github.io/pokemon-go-api/api/types.json'

export const Types = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(URL)
            setData(result.data)
            console.log(result.data)
        }

        fetchData()
    }, [])

    return (
        <>
            <Container maxWidth="lg" sx={{ py: 8, border: '1px solid red', height: '88vh', overflowY: 'scroll' }} >
                <h1>Types</h1>
                {data.map((item, index) => (
                    <div key={index}>
                        <h3>主動方：{item.type}</h3>
                        <p>打誰傷害減半： {item.halfDamageFrom}</p>
                        <p>打誰無效： {item.noDamageFrom}</p>
                        <p>被誰剋： {item.doubleDamageFrom}</p>
                    </div>
                ))}
            </Container>
        </>
    )
}
