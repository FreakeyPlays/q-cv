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
import { CVInputs } from './cv.input.js';
import { userDataService } from '../../services/user.services.js';
import { projectDataService } from '../../services/project.service.js';
import { skillDataService } from '../../services/skills.services.js';
import { cvDataService } from '../../services/cv.service.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faX } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

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

const CreateCV = (params) => {
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
        dragId: uuidv4(),
        institution: "",
        studyType: "",
        subject: "",
        startDate: "",
        endDate: "",
        grade: ""
    }]);
    const [career, setCareer] = useState([{
        dragId: uuidv4(),
        company: "",
        city: "",
        country: "",
        position: "",
        startDate: "",
        endDate: ""
    }]);
    const [ownerId, setOwnerId] = useState("");    

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
            window.scrollTo(0, 0);
            if (id) {
                cvDataService.get(id)
                    .then(res => {
                        mapCv(res);
                    })
                    .catch( error => console.log( error ) );
            } else {
                userDataService.getUser("62961e08f9b16e4ba142dd05")
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

        // console.log(shownSkills);
        // console.log(skills);
        // console.log(allSkillObjects);
    });

    const mapCv = (res) => {
        setCvName(res.data.response.cvName);

        let edu = res.data.response.education;
        for (let e of edu) {
            e.startDate = (e.startDate).substring(0, 10);
            e.endDate = (e.endDate).substring(0, 10);
            e.dragId = uuidv4();
        }

        let car = res.data.response.career;
        for (let c of car) {
            c.startDate = (c.startDate).substring(0, 10);
            c.endDate = (c.endDate).substring(0, 10);
            c.dragId = uuidv4();
        }

        setEducation(edu);
        setCareer(car);
        setShownProjects(res.data.response.projects);
        setuserInfo([res.data.response.userData]);

        userDataService.getUser(res.data.response.ownerId)
            .then(response => {
                setShownSkills(response.data.user.skills);
            })
            .catch (e => console.log(e));

        setSkills(res.data.response.skills);
        setOwnerId(res.data.response.ownerId);
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
        edu.map(e => ({...e, dragId: uuidv4()}));

        const car = response.data.user.career;
        
        setOwnerId(uid);
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


        if (cvName === '') { setCvNameError(true); window.scrollTo(0, 0); };
        if (userInfo[0].name === '') { setNameError(true); window.scrollTo(0, 0); };
        if (userInfo[0].languages === '') { setLanguageError(true); window.scrollTo(0, 0); };
        if (userInfo[0].email === '') { setEmailError(true); window.scrollTo(0, 0); };
        if (userInfo[0].telephone === '') { setTelephoneError(true); window.scrollTo(0, 0); };
        if (userInfo[0].beraterQualifikation === '') { setQualiError(true); window.scrollTo(0, 0); };
        if (userInfo[0].kurzprofil === '') { setProfileError(true); window.scrollTo(0, 0); };

        // if (cvName === '') { validation.cvName setCvNameError(true); window.scrollTo(0, 0); };
        // if (userInfo[0].name === '') { setNameError(true); window.scrollTo(0, 0); };
        // if (userInfo[0].languages === '') { setLanguageError(true); window.scrollTo(0, 0); };
        // if (userInfo[0].email === '') { setEmailError(true); window.scrollTo(0, 0); };
        // if (userInfo[0].telephone === '') { setTelephoneError(true); window.scrollTo(0, 0); };
        // if (userInfo[0].beraterQualifikation === '') { setQualiError(true); window.scrollTo(0, 0); };
        // if (userInfo[0].kurzprofil === '') { setProfileError(true); window.scrollTo(0, 0); };

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

            let mappedEducation = education.map(({dragId, ...keepAttrs}) => keepAttrs);

            if (params.title !== 'Edit') {
                projects.forEach(project => {
                    console.log(project);
                    const activityString = (project.activities).join(', ');
                    project.activities = activityString;
                });
            }

            let result = {};
            result.cvName = cvName;
            result.ownerId = ownerId;
            result.education = mappedEducation;
            result.career = career;
            result.userData = userInfo[0];
            result.projects = projects;
            result.skills = skills;
            result.date = new Date().toJSON().slice(0,10);;

            if (params.title === 'Edit') result._id = id;

            //downloadCV(result);
            // console.log(result);
            saveCV(result);
            window.location.href = "/";
        };
    };

    // Saving CV to MongoDB
    const saveCV = (result) => {
    //check fo updateID != "" => put request, not post
        let promise = params.function(result);

        promise
            .then(response => {
                // console.log(response);
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
            setProjects(values);
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
                dragId: uuidv4(),
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
                dragId: uuidv4(),
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

    const handleOnDragEnd = (result, category) => {
        if (category === "education") {
            const items = Array.from(education);
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);
    
            setEducation(items);
        } else if (category === "career") {
            const items = Array.from(career);
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);
    
            setCareer(items);
        }
    };

    const popupSubmit = (event, projectIdx, shownProjectIdx) => {
        setPopupShow(false);
        const values = [...shownProjects];

        if (shownProjectIdx === -1) { // from button
            values.push(projects[projectIdx]);
        } else {
            let project = projects[projectIdx];
            project.dragId = uuidv4();
            values.splice(shownProjectIdx+1, 0, project);
        };

        setShownProjects(values);
    };

    return(
        <ThemeProvider theme={theme}>
            <Container className={classes.container}>
                {
                    (params.title === "Edit") &&
                    <button id="cancel-button" onClick={(e) => {e.preventDefault(); window.location.href="/";}}>
                        <FontAwesomeIcon className="icon fa-2x" icon={faX} />
                    </button>
                }
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
                    <DragDropContext onDragEnd={(result) => handleOnDragEnd(result, "education")}>
                        <Droppable droppableId="education">
                            {(provided) => (
                                <ul className="list" {...provided.droppableProps} ref={provided.innerRef}>
                                    {education.map((item, index) => {
                                        return (
                                            <Draggable key={item.dragId} draggableId={item.dragId} index={index}>
                                                {(provided) => (
                                                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
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
                                                                {
                                                                    CVInputs.education.map(((cvInput, cvIndex) => {
                                                                        return (
                                                                            <Grid key={cvIndex} item md={6}>
                                                                                <TextField
                                                                                    className={classes.field}
                                                                                    name={cvInput.name}
                                                                                    value={item[cvInput.name]}
                                                                                    label={cvInput.label}
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    onChange={e => handleInputChange(e, index, "education")}
                                                                                />
                                                                            </Grid>
                                                                        )
                                                                    }))
                                                                }
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
                                                    </li>
                                                )}

                                            </Draggable>
                                        )     
                                    })}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>

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

                    <DragDropContext onDragEnd={(result) => handleOnDragEnd(result, "career")}>
                        <Droppable droppableId="education">
                            {(provided) => (
                                <ul className="list" {...provided.droppableProps} ref={provided.innerRef}>
                                    {career.map((item, index) => {
                                        return (
                                            <Draggable key={item.dragId} draggableId={item.dragId} index={index}>
                                                {(provided) => (
                                                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
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
                                                    </li>
                                                )}
                                            </Draggable>
                                        );  
                                    })}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>



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
                                                label="Title"
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
                                    let check = false;
                                    if (skills.some(skill => { return skill.name === name })) check = true;
                                    return (
                                        <FormControlLabel
                                            key={index}
                                            label={name}
                                            value={name}
                                            checked={check}
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
                            {
                                (params.title === "Edit") ?
                                    'Save CV' :
                                    'Create CV'
                            }
                        </Button>
                    </div>
                </form>
            </Container>
        </ThemeProvider>
    )
}

export default CreateCV;