import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react';

const edu = [
    {
        institution: "School 1",
        studyType: "Type",
        subject: "Computer Science",
        startDate: "Yesterday",
        endDate: "Today",
        grade: "4.0"
    },  {
        institution: "School 2",
        studyType: "Type",
        // subject: "Computer Science",
        // startDate: "Yesterday",
        // endDate: "Today",
        grade: "4.0"
    },  {
        // institution: "School 3",
        // studyType: "Type",
        subject: "Computer Science",
        startDate: "Yesterday",
        endDate: "Today",
        grade: "4.0"
    }
];

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 100
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
    subtitle: {
        marginTop: 30,
        marginBottom: 20
    },
    field: {
        marginTop: 10,
        marginBottom: 10,
        display: 'block'
    }
}))

const CreateCV = () => {
    const classes = useStyles();

    const receivedData = useRef(false);

    const [cvName, setCvName] = useState("");
    const [name, setName] = useState("");
    const [languages, setLanguages] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [quali, setQuali] = useState("");
    const [profile, setProfile] = useState("");
    const [education, setEducation] = useState([{
        institution: "", studyType: "",
        subject: "", startDate: "",
        endDate: "", grade: ""
    }]);

    const [cvNameError, setCvNameError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [languageError, setLanguageError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [telephoneError, setTelephoneError] = useState(false);
    const [qualiError, setQualiError] = useState(false);
    const [profileError, setProfileError] = useState(false);

    useEffect(() => {
        if (receivedData.current === false) {
            setEducation(edu);
        };
        receivedData.current = true;
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setCvNameError(false);
        setNameError(false);
        setLanguageError(false);
        setEmailError(false);
        setTelephoneError(false);
        setQualiError(false);
        setProfileError(false);

        if (cvName === '') setCvNameError(true);
        if (name === '') setNameError(true);
        if (languages === '') setLanguageError(true);
        if (email === '') setEmailError(true);

        if (cvName && name && languages && email) {
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
                <TextField
                    className={classes.field}
                    onChange={(e) => setCvName(e.target.value)}
                    label="CV Name"
                    variant="outlined"
                    fullWidth
                    required
                    error={cvNameError}
                />
                <Typography
                    className={classes.subtitle}
                    variant="h5"
                    component="h2"
                >
                    User Info
                </Typography>
                <TextField
                    className={classes.field}
                    onChange={(e) => setName(e.target.value)}
                    label="Name"
                    variant="outlined"
                    fullWidth
                    required
                    error={nameError}
                />
                <TextField
                    className={classes.field}
                    onChange={(e) => setLanguages(e.target.value)}
                    label="Languages"
                    variant="outlined"
                    fullWidth
                    required
                    error={languageError}
                />
                <Grid container>
                    <Grid item md={6}>
                        <TextField
                            className={classes.field}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
                            variant="outlined"
                            fullWidth
                            required
                            error={emailError}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            className={classes.field}
                            onChange={(e) => setTelephone(e.target.value)}
                            label="Telephone"
                            variant="outlined"
                            fullWidth
                            required
                            error={telephoneError}
                        />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                            className={classes.field}
                            onChange={(e) => setQuali(e.target.value)}
                            label="Advisor Qualifications"
                            variant="outlined"
                            fullWidth
                            required
                            multiline
                            minRows={8}
                            error={qualiError}
                        />
                    </Grid>
                    <Grid item md={8}>
                        <TextField
                            className={classes.field}
                            onChange={(e) => setProfile(e.target.value)}
                            label="Short Profile"
                            variant="outlined"
                            fullWidth
                            required
                            multiline
                            minRows={8}
                            error={profileError}
                        />
                    </Grid>
                </Grid>

                <Typography
                    className={classes.subtitle}
                    variant="h5"
                    component="h2"
                >
                    Education
                </Typography>

                {
                    education.map((item, index) => {
                        return (
                            <div key={index}>
                                <Typography
                                    className={classes.subtitle}
                                    variant="h6"
                                    component="h3"
                                >
                                    Education {index + 1}
                                </Typography>
                                <FontAwesomeIcon icon={faPlus} />
                                <FontAwesomeIcon icon={faTrash} />
                                <Grid container>
                                    <Grid item md={6}>
                                        <TextField
                                            className={classes.field}
                                            value={item.institution}
                                            label="Institution"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item md={6}>
                                        <TextField
                                            className={classes.field}
                                            value={item.studyType}
                                            label="Study Type"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item md={6}>
                                        <TextField
                                            className={classes.field}
                                            value={item.subject}
                                            label="Subject"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item md={6}>
                                        <TextField
                                            className={classes.field}
                                            value={item.grade}
                                            label="Grade"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>

                            </div>
                        );
                    })
                }

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