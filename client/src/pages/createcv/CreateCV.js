import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { FormControlLabel, Checkbox } from '@material-ui/core'
import Popup from '../../components/popup/Popup.js';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import './CreateCV.css';
import { userDataService } from '../../services/user.services.js';
import { projectDataService } from '../../services/project.service.js';
import { skillDataService } from '../../services/skills.services.js';
import { cvDataService } from '../../services/cv.service.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

//get :id from link
//const { id } = useParams();

// Material UI: Theme to make font consistent (Segoe UI)
const theme = createTheme({
    typography: {
        fontFamily: [
            "Segoe UI"
        ]
    }
});

// Material UI: Styles for certain MUI components
const useStyles = makeStyles((theme) => ({
    container: {
        padding: 100
    },
    btn: {
        backgroundColor: '#333',
        color: 'white',
        '&:hover': {
            backgroundColor: 'grey'
        },
    },
    submitBtn: {
        float: "right",
        backgroundColor: '#333',
        color: 'white',
        '&:hover': {
            backgroundColor: 'grey'
        },
        marginTop: 30
    },
    title: {
        marginBottom: 40,
        fontWeight: 'bold'
    },
    subtitle: {
        marginTop: 30,
        marginBottom: 20
    },
    itemtitle: {
        marginTop: 30,
        marginBottom: 20,
        color: 'grey'
    },
    field: {
        marginTop: 10,
        marginBottom: 10,
        display: 'block'
    },
    icon: {
        padding: 10
    }
}));

const CreateCV = () => {
    //contains the id if page is visited by edit-cv (/create-cv/:id)
    //undefined if no id.
    const { id } = useParams();

    const classes = useStyles();

    const receivedData = useRef(false);

    // State for project Popup
    const [popupShow, setPopupShow] = useState(false);

    const [cvName, setCvName] = useState("");

    const [userInfo, setuserInfo] = useState([{
        name: "",
        languages: "",
        email: "",
        telephone: "",
        beraterQualifikation: "",
        kurzprofil: ""
    }]);
    const [education, setEducation] = useState([{
        institution: "",
        studyType: "",
        subject: "",
        startDate: "",
        endDate: "",
        grade: ""
    }]);
    const [career, setCareer] = useState([{
        company: "",
        city: "",
        country: "",
        position: "",
        startDate: "",
        endDate: ""
    }]);
    const [ownerId, setOwnderId] = useState("");    

    //updateID

    // State for selected projects
    const [projects, setProjects] = useState([]);
    // State for ALL projects (these are shown in the add project popup)
    const [shownProjects, setShownProjects] = useState([]);
    // State for checked skills
    const [skills, setSkills] = useState([]);
    // State for ALL skills (these are shown under skills)
    const [shownSkills, setShownSkills] = useState([]);//id list of skills
    const [allSkillObjects, setAllSkillObjects] = useState([]);//all Skill Objects (_id and name)

    // States for required userData fields error triggering after submission
    const [cvNameError, setCvNameError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [languageError, setLanguageError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [telephoneError, setTelephoneError] = useState(false);
    const [qualiError, setQualiError] = useState(false);
    const [profileError, setProfileError] = useState(false);

    // Loads in user and project data
    useEffect(() => {
        if (receivedData.current === false) {
            if (id) {
                cvDataService.get(id)
                    .then(res => {
                        mapCv(res);
                    })
                    .catch( error => console.log( error ) );
            } else {
                userDataService.getUser("6293a91218be7b568841d1dd")
                    .then(response => {
                        dataMap(response);
                    })
                    .catch(error => console.log(error));
            }
            projectDataService.getAll()
                .then(response => {
                    setProjects(response.data.response);
                })
                .catch(error => console.log(error));

            skillDataService.getAll()
                .then(response => setAllSkillObjects(response.data.response))
                .catch( e => console.error(e.message));
        };
        receivedData.current = true;

        console.log(shownSkills);
        //console.log(allSkillObjects);
    });

    const mapCv = (res) => {
        setCvName(res.data.response.cvName);
        setEducation(res.data.response.education);
        setCareer(res.data.response.career);
        setShownProjects(res.data.response.projects);
        setuserInfo([res.data.response.userData]);

        userDataService.getUser(res.data.response.ownerId)
            .then(response => {
                console.log(response);
                setShownSkills(response.data.user.skills);
            })
            .catch (e => console.log(e));
    }

    // returns name as a string of matching Skill-Object
    const getSkillNameById = (id) => {
        let skillObj = allSkillObjects.filter( skill => skill._id === id)[0];
        return skillObj ? skillObj.name : "404, name not found";
    }

    // Takes user data and set states to populate form fields
    const dataMap = (response) => {
        const name = response.data.user.firstName + " " + response.data.user.lastName;
        const languages = response.data.user.sprachen.join(', ');
        const email = response.data.user.eMail;
        const beraterQualifikation = response.data.user.beratungsschwerpunkte.join(', ');
        const kurzprofil = response.data.user.kurzprofil;
        const uid = response.data.user._id;

        const data = {
            name: name,
            languages: languages,
            email: email,
            telephone: "",
            beraterQualifikation: beraterQualifikation,
            kurzprofil: kurzprofil
        };

        const edu = response.data.user.education;
        const car = response.data.user.career;
        
        setOwnderId(uid);
        setuserInfo([data]);
        setEducation(edu);
        setCareer(car);
        setShownSkills(response.data.user.skills);
    }

    // Various input validation measures, once passed, saves CV to MongoDB and also downloads .docx document
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
        if (userInfo[0].name === '') setNameError(true);
        if (userInfo[0].languages === '') setLanguageError(true);
        if (userInfo[0].email === '') setEmailError(true);
        if (userInfo[0].telephone === '') setTelephoneError(true);
        if (userInfo[0].beraterQualifikation === '') setQualiError(true);
        if (userInfo[0].kurzprofil === '') setProfileError(true);

        if (!skills.length) alert("Please add at least one skill to the CV.");

        if (cvName &&
            userInfo[0].name &&
            userInfo[0].languages &&
            userInfo[0].email &&
            userInfo[0].telephone &&
            userInfo[0].beraterQualifikation &&
            userInfo[0].kurzprofil &&
            skills.length
        ) {
            let projects = [...shownProjects];

            projects.forEach(project => {
                const activityString = project.activities.join(', ');
                project.activities = activityString;
            });

            let userData = userInfo[0];
            let date = new Date().toJSON().slice(0,10);

            let result = {cvName, ownerId, education, career, userData, projects, skills, date};
            
            //downloadCV(result);
            console.log(result);
            saveCV(result);
        };
    };

    // Saving CV to MongoDB
    const saveCV = (result) => {
    //check fo updateID != "" => put request, not post
        cvDataService.create(result)
            .then(response => {
                // downloadCV(response);
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    // Downloading CV using Microsoft Power Automate
    const downloadCV = (result) => {
        axios.post("https://prod-115.westus.logic.azure.com:443/workflows/f595e6ffa2d7449fb93eb92b11a4468e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=d2PEMA_gwcLyPdh7meXdRiUVtouL6qyNSGXKMIPDHxc", result)
        .then(response => {
            alert("Generating CV...");

        })
        .catch(error => console.log(error));
    };

    const addCvToUser = (cvId, userId)=>{

    }

    const handleInputChange = (event, index, category) => {
        if (category === "education") {
            const values = [...education];
            values[index][event.target.name] = event.target.value;
            setEducation(values);
        } else if (category === "userInfo") {
            let values = [...userInfo];
            values[0][event.target.name] = event.target.value;
            setuserInfo(values);
        } else if (category === "career") {
            const values = [...career];
            values[index][event.target.name] = event.target.value;
            setCareer(values);
        } else if (category === "projects") {
            const values = [...shownProjects];
            values[index][event.target.name] = event.target.value;
        }
    };

    const handleSkillChange = (event) => {      
        //if box is deselected
        if(!event.target.checked){
            setSkills(skills.filter( skill => skill.name !== event.target.value ))
        }else{
            setSkills([...skills, { "name": allSkillObjects.filter( skill => skill.name === event.target.value)[0].name }]);
        }
    };
    
    const handleAddField = (event, index, category) => {
        let newFields = {};
        if (category === "education") {
            newFields = {
                institution: "",
                subject: "",
                studyType: "",
                startDate: "",
                endDate: "",
                grade: ""
            };
            const values = [...education];
            values.splice(index+1, 0, newFields);
            setEducation(values);
        } else if (category === "career") {
            newFields = {
                company: "",
                city: "",
                country: "",
                position: "",
                startDate: "",
                endDate: ""
            };
            const values = [...career];
            values.splice(index+1, 0, newFields);
            setCareer(values);
        } else if (category === "projects") {
            setPopupShow(true);
        }
    };

    const handleRemoveField = (event, index, category) => {
        if (category === "education") {
            const values = [...education];
            values.splice(index, 1);
            setEducation(values);
        } else if (category === "career") {
            const values = [...career];
            values.splice(index, 1);
            setCareer(values);
        } else if (category === "projects") {
            const values = [...shownProjects];
            values.splice(index, 1);
            setShownProjects(values);
        }
    };

    const popupSubmit = (event, projectIdx, shownProjectIdx) => {
        setPopupShow(false);
        const values = [...shownProjects];

        if (shownProjectIdx === -1) { // from button
            values.push(projects[projectIdx]);
        } else {
            values.splice(shownProjectIdx+1, 0, projects[projectIdx]);
        };

        setShownProjects(values);
    };

    return(
        <ThemeProvider theme={theme}>
            <Container className={classes.container}>
                <Typography
                    className={classes.title}
                    variant="h3"
                    component="h1"
                    gutterBottom
                >
                    {
                        id ? 'Update CV' : 'Create CV'
                    }
                </Typography>

                <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                    <TextField
                        className={classes.field}
                        onChange={(e) => setCvName(e.target.value)}
                        label="CV Name"
                        variant="outlined"
                        value={cvName}
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
                    {
                        true ? (
                            <TextField
                                className={classes.field}
                                name="name"
                                onChange={(e) => handleInputChange(e, -1, "userInfo")}
                                label="Name"
                                variant="outlined"
                                value={userInfo[0].name}
                                fullWidth
                                required
                                error={nameError}
                            />
                        ) : (
                            <></>
                        )
                    }

                    <TextField
                        className={classes.field}
                        name="languages"
                        onChange={(e) => handleInputChange(e, -1, "userInfo")}
                        label="Languages"
                        variant="outlined"
                        value={userInfo[0].languages}
                        fullWidth
                        required
                        error={languageError}
                    />
                    <Grid container>
                        <Grid item md={6}>
                            <TextField
                                className={classes.field}
                                name="email"
                                onChange={(e) => handleInputChange(e, -1, "userInfo")}
                                label="Email"
                                variant="outlined"
                                value={userInfo[0].email}
                                fullWidth
                                required
                                error={emailError}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                className={classes.field}
                                name="telephone"
                                onChange={(e) => handleInputChange(e, -1, "userInfo")}
                                label="Telephone"
                                variant="outlined"
                                value={userInfo[0].telephone}
                                fullWidth
                                required
                                error={telephoneError}
                            />
                        </Grid>
                        <Grid item md={4}>
                            <TextField
                                className={classes.field}
                                name="beraterQualifikation"
                                onChange={(e) => handleInputChange(e, -1, "userInfo")}
                                label="Advisor Qualifications"
                                variant="outlined"
                                value={userInfo[0].beraterQualifikation}
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
                                name="kurzprofil"
                                onChange={(e) => handleInputChange(e, -1, "userInfo")}
                                label="Short Profile"
                                variant="outlined"
                                value={userInfo[0].kurzprofil}
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
                        (education.length === 0) &&
                        <Button onClick={event => handleAddField(event, 0, "education")} className={classes.btn}>
                            <FontAwesomeIcon className={classes.icon} icon={faPlus} />
                            Add new Education card
                        </Button>
                    }
                    {
                        education.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className="education-header">
                                        <Typography
                                            className={classes.itemtitle}
                                            variant="h6"
                                            component="h3"
                                        >
                                            Education {index + 1}
                                        </Typography>
                                        <div className="education-icons">
                                            <FontAwesomeIcon className={classes.icon} onClick={event => handleAddField(event, index, "education")} icon={faPlus} />
                                            <FontAwesomeIcon className={classes.icon} onClick={event => handleRemoveField(event, index, "education")} icon={faTrash} />
                                        </div>
                                    </div>
                                    <Grid container>
                                        <Grid item md={6}>
                                            <TextField
                                                className={classes.field}
                                                name="institution"
                                                value={item.institution}
                                                label="Institution"
                                                variant="outlined"
                                                fullWidth
                                                onChange={event => handleInputChange(event, index, "education")}
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <TextField
                                                className={classes.field}
                                                name="studyType"
                                                value={item.studyType}
                                                label="Study Type"
                                                variant="outlined"
                                                fullWidth
                                                onChange={event => handleInputChange(event, index, "education")}
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <TextField
                                                className={classes.field}
                                                name="subject"
                                                value={item.subject}
                                                label="Subject"
                                                variant="outlined"
                                                fullWidth
                                                onChange={event => handleInputChange(event, index, "education")}
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <TextField
                                                className={classes.field}
                                                name="grade"
                                                value={item.grade}
                                                label="Grade"
                                                variant="outlined"
                                                fullWidth
                                                onChange={event => handleInputChange(event, index, "education")}
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <span className="dateInputLabel">Start date:</span>
                                            <input className="dateInput"
                                                type="date"
                                                name="startDate"
                                                value={item.startDate}
                                                onChange={event => handleInputChange(event, index, "education")}
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <span className="dateInputLabel">End date:</span>
                                            <input className="dateInput"
                                                type="date"
                                                name="endDate"
                                                value={item.endDate}
                                                onChange={event => handleInputChange(event, index, "education")}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            );
                        })
                    }

                    <Typography
                        className={classes.subtitle}
                        variant="h5"
                        component="h2"
                    >
                        Career
                    </Typography>
                    {
                        (career.length === 0) &&
                        <Button onClick={event => handleAddField(event, 0, "career")} className={classes.btn}>
                            <FontAwesomeIcon className={classes.icon} icon={faPlus} />
                            Add new Career card
                        </Button>
                    }
                    {
                        career.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className="education-header">
                                        <Typography
                                            className={classes.itemtitle}
                                            variant="h6"
                                            component="h3"
                                        >
                                            Career {index + 1}
                                        </Typography>
                                        <div className="education-icons">
                                            <FontAwesomeIcon className={classes.icon} onClick={event => handleAddField(event, index, "career")} icon={faPlus} />
                                            <FontAwesomeIcon className={classes.icon} onClick={event => handleRemoveField(event, index, "career")} icon={faTrash} />
                                        </div>
                                    </div>
                                    <Grid container>
                                        <Grid item md={6}>
                                            <TextField
                                                className={classes.field}
                                                name="company"
                                                value={item.company}
                                                label="Company"
                                                variant="outlined"
                                                fullWidth
                                                onChange={event => handleInputChange(event, index, "career")}
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <TextField
                                                className={classes.field}
                                                name="position"
                                                value={item.position}
                                                label="Position"
                                                variant="outlined"
                                                fullWidth
                                                onChange={event => handleInputChange(event, index, "career")}
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <TextField
                                                className={classes.field}
                                                name="city"
                                                value={item.city}
                                                label="City"
                                                variant="outlined"
                                                fullWidth
                                                onChange={event => handleInputChange(event, index, "career")}
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <TextField
                                                className={classes.field}
                                                name="country"
                                                value={item.country}
                                                label="Country"
                                                variant="outlined"
                                                fullWidth
                                                onChange={event => handleInputChange(event, index, "career")}
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <span className="dateInputLabel">Start date:</span>
                                            <input className="dateInput"
                                                type="date"
                                                name="startDate"
                                                value={item.startDate}
                                                onChange={event => handleInputChange(event, index, "career")}
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <span className="dateInputLabel">End date:</span>
                                            <input className="dateInput"
                                                type="date"
                                                name="endDate"
                                                value={item.endDate}
                                                onChange={event => handleInputChange(event, index, "career")}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            );
                        })
                    }

                    <Typography
                        className={classes.subtitle}
                        variant="h5"
                        component="h2"
                    >
                        Projects
                    </Typography>

                    {
                        shownProjects.length === 0 &&
                        <Button className={classes.btn} onClick={() => setPopupShow(true)}>
                            <FontAwesomeIcon className={classes.icon} icon={faPlus} />
                            Add new Project card
                        </Button>
                    }


                    {
                        shownProjects.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className="education-header">
                                        <Typography
                                            className={classes.itemtitle}
                                            variant="h6"
                                            component="h3"
                                        >
                                            Project {index + 1}
                                        </Typography>
                                        <div className="education-icons">
                                            <FontAwesomeIcon className={classes.icon} onClick={e => handleAddField(e, index, "projects")} icon={faPlus} />
                                            <FontAwesomeIcon className={classes.icon} onClick={e => handleRemoveField(e, index, "projects")} icon={faTrash} />
                                        </div>
                                    </div>
                                    <Grid container>
                                        <Grid item md={6}>
                                            <TextField
                                                className={classes.field}
                                                name="title"
                                                value={item.title}
                                                label="TItle"
                                                variant="outlined"
                                                fullWidth
                                                onChange={event => handleInputChange(event, index, "projects")}
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <TextField
                                                className={classes.field}
                                                name="customer"
                                                value={item.customer}
                                                label="Customer"
                                                variant="outlined"
                                                fullWidth
                                                onChange={event => handleInputChange(event, index, "projects")}
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <TextField
                                                className={classes.field}
                                                name="industry"
                                                value={item.industry}
                                                label="Industry"
                                                variant="outlined"
                                                fullWidth
                                                onChange={event => handleInputChange(event, index, "projects")}
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <TextField
                                                className={classes.field}
                                                name="country"
                                                value={item.country}
                                                label="Country"
                                                variant="outlined"
                                                fullWidth
                                                onChange={event => handleInputChange(event, index, "projects")}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            );
                        })
                    }

                    <Popup trigger={popupShow} setTrigger={setPopupShow}>
                        <h2>Existing Projects</h2>
                        {
                            projects.map((item, index) => {
                                return (
                                    <div key={index} onClick={(event) => popupSubmit(event, index, -1)}>
                                        <h5>{item.title}</h5>
                                    </div>
                                )
                            })
                        }
                    </Popup>

                    <Typography
                        className={classes.subtitle}
                        variant="h5"
                        component="h2"
                    >
                        Skills
                    </Typography>

                    <div className="skillContainer">
                        {
                            shownSkills.length ?
                                shownSkills.map((item, index) => {
                                    let name = getSkillNameById(item)
                                    return (
                                        <FormControlLabel
                                            key={index}
                                            label={name}
                                            value={name}
                                            control={<Checkbox onChange={(event) => handleSkillChange(event)}/>}
                                        />
                                        
                                    )
                                })
                            : <span>This user has no skills. Please add a skill to this user in order to save/generate CV.</span>
                        }
                    </div>


                    <div>
                        <Button
                            className={classes.submitBtn}
                            type="submit"
                            variant="contained"
                        >
                            Save CV and Download CV (.docx)
                        </Button>
                    </div>
                </form>
            </Container>
        </ThemeProvider>
    )
}

export default CreateCV;