import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useState } from 'react';

const useStyles = makeStyles({
    container: {
        padding: 30
    },
    btn: {
        backgroundColor: 'black',
        color: 'white',
        '&:hover': {
            backgroundColor: 'grey'
        }
    },
    title: {
        marginBottom: 40
    },
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
});

const CreateCV = () => {
    const classes = useStyles();
    const [cvName, setCvName] = useState("");
    const [cvNameError, setCvNameError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setCvNameError(false);

        if (cvName === '') {
            setCvNameError(true);
        };

        if (cvName) {
            console.log(cvName);
        };
    }

    return(
        <Container className={classes.container}>
            <Typography
                className={classes.title}
                variant="h3"
                component="h1"
                gutterBottom
            >
                Create CV
            </Typography>

            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item md={4}>
                        <Paper>1</Paper>
                    </Grid>
                    <Grid item md={4}>
                        <Paper>2</Paper>
                    </Grid>
                    <Grid item md={4}>
                        <Paper>3</Paper>
                    </Grid>
                </Grid>
                <TextField
                    className={classes.field}
                    onChange={(e) => setCvName(e.target.value)}
                    label="CV Name"
                    variant="outlined"
                    fullWidth
                    required
                    error={cvNameError}
                />
                <Button
                    className={classes.btn}
                    type="submit"
                    variant="contained"
                >
                    Submit
                </Button>
            </form>
        </Container>
    )
}

export default CreateCV;