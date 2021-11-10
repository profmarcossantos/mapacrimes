import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { saveCrimes } from '../services/Firebase';
import { useHistory } from "react-router-dom";

export default function Crimes() {
    let history = useHistory();
    const [endereco, setEndereco] = useState("")
    const [descricao, setDescricao] = useState("")


    const save = async () => {

        let objeto = {
            endereco: endereco,
            descricao: descricao
        }
        try {
            await saveCrimes(objeto)
            history.push("/crimeslista")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Cadastro de Crimes</h1>
            <Grid container spacing={1}>

                <Grid item xs={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                id="outlined-basic"
                                label="Endereço"
                                variant="outlined"
                                value={endereco}
                                size="small"
                                fullWidth
                                onChange={(e) => setEndereco(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                id="outlined-basic"
                                label="Descricão"
                                variant="outlined"
                                value={descricao}
                                size="small"
                                fullWidth
                                multiline
                                rows={4}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" size="small" onClick={save}>
                                Salvar Registro
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>


            </Grid>
        </div>
    )
}
