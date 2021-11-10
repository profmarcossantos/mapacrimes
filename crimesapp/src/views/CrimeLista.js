import React, { useState, useLayoutEffect } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { deleteCrimes, getCrimes } from '../services/Firebase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function CrimesLista() {

    const [crimes, setCrimes] = useState([])

    useLayoutEffect(() => {
        pegarCrimes()
    }, [])


    const pegarCrimes = async () => {
        let dados = await getCrimes()
        setCrimes(dados)
    }

    const deletar = async (id) => {
        await deleteCrimes(id)
        await pegarCrimes()
    }


    return (
        <div>
            <h1>Cadastro de Crimes</h1>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Endereço</TableCell>
                                    <TableCell align="left">Descrição</TableCell>
                                    <TableCell align="left">Opções</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {crimes.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{row.endereco}</TableCell>
                                        <TableCell align="left">{row.descricao}</TableCell>
                                        <TableCell align="left">
                                            <Button onClick={() => deletar(row.id)} >Deletar</Button>

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    )
}
