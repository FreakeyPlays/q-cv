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
import { careerDataService } from '../../services/career.service.js';
import { educationDataService} from '../../services/education.service.js';
import { cvDataService } from '../../services/cv.service.js';
import UserService from "../../services/keycloakUser.service.js";
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
    // State for popup category
    const [popupCategory, setPopupCategory] = useState("");
    // State for loading bar Popup
    const [loadShow, setLoadShow] = useState(false);

    const[userId, setUserId] = useState('');
    UserService.getLoggedInUID()
    .then( res => setUserId( res ) )
    .catch( e => console.error(e.message) );

    const [cvName, setCvName] = useState("");

    const [userInfo, setuserInfo] = useState([{
        name: "",
        languages: "",
        email: "",
        telephone: "",
        beraterQualifikation: "",
        kurzprofil: ""
    }]);
    const [education, setEducation] = useState([]);
    const [career, setCareer] = useState([]);
    const [ownerId, setOwnerId] = useState("");    

    // State for selected projects
    const [projects, setProjects] = useState([]);
    // State for ALL projects (these are shown in the add project popup)
    const [shownProjects, setShownProjects] = useState([]);
    // State for ALL careers (These are shown in the add career popup)
    const [allCareerObjects, setAllCareerObjects] = useState([]);
    // State for ALL education (These are shwon in the add education popup)
    const [allEduObjects, setAllEduObjects] = useState([]);
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
        if (userId) {
            if (receivedData.current === false) {
                window.scrollTo(0, 0);
                
                projectDataService.getAllById({ owner: userId })
                    .then(response => {
                        let temp = response.data.response;
                        temp.sort( (a, b) => {
                            let da = new Date(a.startDate);
                            let db = new Date(b.startDate);
                            return db - da; //da-db would ab ascending
                        });
                        setProjects(temp);
                    })
                    .catch(e => console.warn(e.message));
    
                skillDataService.getAll()
                    .then(response => setAllSkillObjects(response.data.response))
                    .catch(e => console.error(e.message));
    
                educationDataService.getAll({ owner: userId })
                    .then(response => {
                        let temp = response.data.response;
                        temp.sort( (a, b) => {
                            let da = new Date(a.startDate);
                            let db = new Date(b.startDate);
                            return db - da; //da-db would ab ascending
                        });
                        setAllEduObjects(temp);
                    })
                    .catch(e => console.error(e.message));

                careerDataService.getAllById({ owner: userId })
                    .then(response => {
                        let temp = response.data.response;
                        temp.sort( (a, b) => {
                            let da = new Date(a.startDate);
                            let db = new Date(b.startDate);
                            return db - da; //da-db would ab ascending
                        });
                        setAllCareerObjects(temp);
                    })
                    .catch(e => {
                        console.warn(e.message)
                    });

                if (id) {
                    cvDataService.get(id)
                        .then(res => {
                            mapCv(res);
                        })
                        .catch( error => console.warn( error ) );
                } else {
                    userDataService.getUser(userId)
                        .then(res => {
                            mapUser(res);
                        })
                        .catch(error => console.warn(error));
                }
            };
            receivedData.current = true;
        }
    }, [userId, allCareerObjects, id]);

    const mapCv = (res) => {
        setCvName(res.data.response.cvName);

        let edu = res.data.response.education;
        for (let e of edu) {
            e.startDate = (e.startDate).substring(0, 10);
            e.endDate = (e.endDate).substring(0, 10);
            e.dragId = uuidv4();
        };

        let car = res.data.response.career;
        for (let c of car) {
            c.startDate = (c.startDate).substring(0, 10);
            c.endDate = (c.endDate).substring(0, 10);
            c.dragId = uuidv4();
        };

        let proj = res.data.response.projects
        for (let p of proj) {
            p.startDate = (p.startDate).substring(0, 10);
            p.endDate = (p.endDate).substring(0, 10);
            p.dragId = uuidv4();
        };

        setEducation(edu);
        setCareer(car);
        setShownProjects(proj);
        setuserInfo([res.data.response.userData]);

        userDataService.getUser(res.data.response.ownerId)
            .then(response => {
                setShownSkills(response.data.user.skills);
            })
            .catch (e => console.warn(e));

        setSkills(res.data.response.skills);
        setOwnerId(res.data.response.ownerId);
    }

    // returns name as a string of matching Skill-Object
    const getSkillNameById = (id) => {
        let skillObj = allSkillObjects.filter( skill => skill._id === id)[0];
        return skillObj ? skillObj.name : "404";
    }

    // Takes user data and set states to populate form fields
    const mapUser = (response) => {
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
        
        setOwnerId(uid);
        setuserInfo([data]);
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

            mappedEducation.forEach(edu => {
                if (edu.institution === "") edu.institution = "(Institution)";
                if (edu.studyType === "") edu.studyType = "(Study type)";
                if (edu.subject === "") edu.subject = "(Subject)";
                if (edu.grade === "") edu.grade = "(Grade)";
            });

            projects.forEach(project => {
                var activityString = project.activites;
                delete project.dragId;
                if (Array.isArray(project.activities)) activityString = (project.activities).join(', ');
                project.activities = activityString;
            });

            career.forEach(car => {
                if (car.company === "") car.company = "(Company)";
                if (car.position === "") car.position = "(Position)";
                if (car.city === "") car.city = "(City)";
                if (car.country === "") car.country = "(Country)";
                delete car.dragId;
            });

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

            setLoadShow(true);
            downloadCV(result);
            //saveCV(result);
        };
    };

    //Saving CV to MongoDB
    const saveCV = (result) => {
        let promise = params.function(result);

        promise
            .then(response => {

            })
            .catch(error => {
                console.warn(error);
            });
    };

    // Downloading CV using Microsoft Power Automate
    const downloadCV = (result) => {
        axios.post("https://prod-115.westus.logic.azure.com:443/workflows/f595e6ffa2d7449fb93eb92b11a4468e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=d2PEMA_gwcLyPdh7meXdRiUVtouL6qyNSGXKMIPDHxc", result)
        .then(response => {
            result.sharepointLink = response.data;
            saveCV(result);
            window.location.href = "/";
        })
        .catch(error => console.warn(error));
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
        if(!event.target.checked){
            setSkills(skills.filter( skill => skill.name !== event.target.value ))
        }else{
            setSkills([...skills, { "name": allSkillObjects.filter( skill => skill.name === event.target.value)[0].name }]);
        }
    };
    
    const handleAddField = (event, index, category) => {
        let newFields = {};
        if (category === "education") {
            setPopupCategory("education");
        } else if (category === "career") {
            setPopupCategory("career");
        } else if (category === "projects") {
            setPopupCategory("projects");
        }
        setPopupShow(true);
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
        } else if (category === "projects") {
            const items = Array.from(shownProjects);
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);
            setShownProjects(items);
        }
    };

    const popupSubmit = (event, projectIdx, shownProjectIdx, category) => {
        setPopupShow(false);
        var values;
        if (category === "projects") {
            values = [...shownProjects];
            let project = projects[projectIdx];
            project.dragId = uuidv4();
            project.startDate = (project.startDate).slice(0,10);
            project.endDate = (project.endDate).slice(0,10);
    
            if (shownProjectIdx === -1) { // from button
                values.push(project);
            } else {
                values.splice(shownProjectIdx+1, 0, project);
            };
            setShownProjects(values);
        } else if (category === "career") {
            values = [...career];
            let x = allCareerObjects[projectIdx];
            x.city = allCareerObjects[projectIdx].location;
            x.country = "(Country)"
            x.dragId = uuidv4();
            x.startDate = (x.startDate).slice(0,10);
            x.endDate = (x.endDate).slice(0,10);
    
            if (shownProjectIdx === -1) { // from button
                values.push(x);
            } else {
                values.splice(shownProjectIdx+1, 0, x);
            };
            setCareer(values);
        } else if (category === "education") {
            values = [...education];
            let x = {};
            x.dragId = uuidv4();
            x.institution = allEduObjects[projectIdx].title;
            x.studyType = allEduObjects[projectIdx].degree;
            x.subject = allEduObjects[projectIdx].fieldOfStudy;
            x.grade = "(Grade)";
            x.subject = "(Subject)";
            x.startDate = allEduObjects[projectIdx].startDate.slice(0,10);
            x.endDate = allEduObjects[projectIdx].endDate.slice(0,10);

            values.push(x);

            setEducation(values);
        }

        setPopupCategory("");
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
                        <Button onClick={event => handleAddField(event, -1, "career")} className={classes.btn}>
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
                        <Button className={classes.btn} onClick={(e) => handleAddField(e, -1, "projects")}>
                            <FontAwesomeIcon className={classes.icon} icon={faPlus} />
                            Add new Project card
                        </Button>
                    }

                    <DragDropContext onDragEnd={(result) => handleOnDragEnd(result, "projects")}>
                        <Droppable droppableId="education">
                            {(provided) => (
                                <ul className="list" {...provided.droppableProps} ref={provided.innerRef}>
                                    {shownProjects.map((item, index) => {
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
                                                                    Project {index + 1}
                                                                </Typography>
                                                                <div className="education-icons">
                                                                    <FontAwesomeIcon className={classes.icon} onClick={e => handleAddField(e, index, "projects")} icon={faPlus} />
                                                                    <FontAwesomeIcon className={classes.icon} onClick={e => handleRemoveField(e, index, "projects")} icon={faTrash} />
                                                                </div>
                                                            </div>
                                                            <Grid container>
                                                                {
                                                                    CVInputs.project.map((cvInput, cvIndex) => {
                                                                        return (
                                                                            <Grid key={cvIndex} item md={6}>
                                                                                <TextField
                                                                                    className={classes.field}
                                                                                    name={cvInput.name}
                                                                                    value={item[cvInput.name]}
                                                                                    label={cvInput.label}
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    onChange={e => handleInputChange(e, index, "projects")}
                                                                                />
                                                                            </Grid>
                                                                        )
                                                                    }) 
                                                                }
                                                                <Grid item md={6}>
                                                                    <span className="dateInputLabel">Start date:</span>
                                                                    <input className="dateInput"
                                                                        type="date"
                                                                        name="startDate"
                                                                        value={item.startDate}
                                                                        onChange={event => handleInputChange(event, index, "projects")}
                                                                    />
                                                                </Grid>
                                                                <Grid item md={6}>
                                                                    <span className="dateInputLabel">End date:</span>
                                                                    <input className="dateInput"
                                                                        type="date"
                                                                        name="endDate"
                                                                        value={item.endDate}
                                                                        onChange={event => handleInputChange(event, index, "projects")}
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

                    <Popup trigger={popupShow} setTrigger={setPopupShow}>
                        {(popupCategory) === "projects" && <h2>My Projects</h2>}
                        {(popupCategory) === "career" && <h2>My Careers</h2>}
                        {(popupCategory) === "education" && <h2>My Education</h2>}
                        {
                            (popupCategory === "projects") &&
                            projects.map((item, index) => {
                                return (
                                    <div className='listItem' key={index} onClick={(event) => popupSubmit(event, index, -1, "projects")}>
                                        <h5>{item.title}</h5>
                                    </div>
                                )
                            })
                        }
                        {
                            (popupCategory === "career") &&
                            allCareerObjects.map((item, index) => {
                                return (
                                    <div className='listItem' key={index} onClick={(event) => popupSubmit(event, index, -1, "career")}>
                                        <h5>{item.title}</h5>
                                    </div>
                                )
                            })
                        }
                        {
                            (popupCategory === "education") &&
                            allEduObjects.map((item, index) => {
                                return (
                                    <div className='listItem' key={index} onClick={(event) => popupSubmit(event, index, -1, "education")}>
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

                    {loadShow &&
                        <div className='load-popup'>
                            <div class="lds-ring">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <h4>Generating CV</h4>
                        </div> 
                    }
                </form>
            </Container>
        </ThemeProvider>
    )
}

export default CreateCV;