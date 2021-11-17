import React from 'react'
import Grid from '@mui/material/Grid';
import { useHistory } from "react-router-dom";
import { logoff } from '../services/Firebase'
import Button from '@mui/material/Button';

export default function Menu() {
    let history = useHistory();
    const efetuarLogoff = () => {
        logoff()
            .then(() => history.push("/"))
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={2}>
                <Button
                    onClick={() => history.push("/home")}
                    fullWidth variant="outlined">Home</Button>
            </Grid>

            <Grid item xs={2}>
                <Button
                    onClick={() => history.push("/crimes")}
                    fullWidth variant="outlined">Cadastro de Crimes</Button>
            </Grid>
            <Grid item xs={2}>
                <Button
                    onClick={() => history.push("/crimeslista")}
                    fullWidth variant="outlined">Visualizar Crimes</Button>
            </Grid>
            <Grid item xs={2}>
                <Button fullWidth variant="outlined" onClick={efetuarLogoff}>Logoff</Button>
            </Grid>
        </Grid>

    )
}
