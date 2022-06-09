import React, {useState, useEffect} from 'react'
import { userDataService } from '../../services/user.services';
import { faPen, faTrash} from '@fortawesome/free-solid-svg-icons'
import './AdminUSerData.css';
import {pwdInput, AdminUserInput} from './AdminUserInput.js';
import Popup from '../../components/popup/Popup.js';
import Titlebar from '../../components/titlebar/Titlebar';

import { Button } from '@material-ui/core';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormInput from '../../components/formInput/FormInput';

const AdminUserData = () =>{
    //State Variales section
    const [users, setUsers] = useState([]); //stored User Datas
    const [selectedUser, setUserID] = useState(""); //stores selected User ID
    const [isAdminVal, setAdmin] = useState(false); //state variable for checking is admin status
    const [newPwd, setPwd] = useState("");
    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
        eMail:"",
        password:"",
        isAdmin: false
    }); //cache for used user

    //update state variables
    const [updatePopup, setUpdatePopup] = useState(false);
    const [createPopup, setCreatePopup] = useState(false);
    const [passwordPopup, setPasswordPopup] = useState(false);
    
    useEffect(() =>{
        retrieveUsers();
    },[])
    
    //Function for getting all Users from DB --> stores into array
    const retrieveUsers = () =>{
        
        userDataService.getUsers().then(response=>{
            console.log(response.data)
            setUsers(response.data.user)
        }).catch( e =>{
            console.log(e)
        })
    }

    const updateUser = (e) =>{
        e.preventDefault();
        let cach = {};  //cache for changed data
        
        for(let i = 0; i < 4; i++){ //adding new data into cach
            cach[e.target[i].name] = e.target[i].value;
        }
        cach["_id"] = selectedUser;          //set userid into cache --> Important for API call
        
        //update Api call
        userDataService.updateUser(cach).then(() => window.location.reload(false)).catch((e) => console.log("Update fehlgeschlagen!"));

        //clears the state user object ( --> otherwise it would be shown in create user popup )
        for(let j = 0; j < 5; j++){
            user.target[j].name = "";
        }
    }

    //function for setting new pwd
    const setPWD = () =>{

        let cach = {};
        cach["_id"] = selectedUser;
        cach["password"] = newPwd;

        userDataService.updateUser(cach).then(() => window.location.reload(false)).catch((e) => console.log(e));
        setPwd("");
    }

    const createUser = (e) =>{
        e.preventDefault();
        let cach = {};

        for(let i = 0; i < 4; i++){ //adding new data into cache
            cach[e.target[i].name] = e.target[i].value;
        }
        cach["isAdmin"] = isAdminVal;
        
        //create user api call
        userDataService.createUser(cach).then(() => window.location.reload(false)).catch((e) => console.log(e));
        setAdmin(false);


    }

    //change state functions
    function handleOnChange(e){
        setUser({...user, [e.target.name]: e.target.value});
    }
    function handleChange (){
        setAdmin(true);
    }
    function handlePwdChange(e){
        setPwd(e.target.value);
        console.log(newPwd);
    }

    return(
    //divided into first the normal page and after into extra pages like Popups etv.
    <>
        <div className="main">
            <div className='mainHeader'>
            <Titlebar
                searchbar={false} 
                showAll={false}
                path=""
                function={setCreatePopup}
            />
            </div>
            <div className="userList">
            <Container>
                <Form>
                <Row>
                    {users.map((item,index) =>{
                        return(
                            <Col key={index}>
                                <Card className="userBox">
                                <Card.Body className="cardBody">
                                        <Card.Header className="cardHeader" as="h4">{item.firstName} {item.lastName}
                                            <div className="buttonWrapper">
                                            <div data={index} onClick={(e) =>{
                                                    userDataService.deleteUser(item._id).then(res =>{
                                                    window.location.reload(false);
                                                    })
                                                }}>
                                                <FontAwesomeIcon className="icon" icon={faTrash}/>
                                            </div>
                                            <div data={index} onClick={(e) => {
                                                let uData ={
                                                    firstName: users[e.currentTarget.getAttribute("data")].firstName,
                                                    lastName: users[e.currentTarget.getAttribute("data")].lastName,
                                                    eMail: users[e.currentTarget.getAttribute("data")].eMail,
                                                    password: users[e.currentTarget.getAttribute("data")].password,
                                                    isAdmin:users[e.currentTarget.getAttribute("data")].isAdmin 
                                                }
                                                setUserID(users[e.currentTarget.getAttribute("data")]._id);
                                                setUser(uData);
                                                setUpdatePopup(true);
                                                }}>
                                                <FontAwesomeIcon className='icon' icon={faPen}/>
                                            </div>
                                            </div>
                                        </Card.Header>
                                        <Card.Text>ID: {item._id}</Card.Text>
                                        <Card.Text>E-Mail: {item.eMail}</Card.Text>
                                        <div className='changePWDButton'>
                                            <Button variant="Text" data={index} onClick={(e) =>{
                                                setUserID(users[e.currentTarget.getAttribute("data")]._id);
                                                setPasswordPopup(true);
                                            }}>Neues Passwort</Button>
                                        </div>
                                        
                                </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
                </Form>
            </Container>
            </div>
        </div>

        <Popup trigger={updatePopup} setTrigger={setUpdatePopup}>
            <h3>Userdaten ändern</h3>
            <form className='updateContent' noValidate onSubmit={updateUser}>
                {AdminUserInput.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={user[input.name]}
                        onChange={handleOnChange} />
                ))}

                <div className='submitButton'>
                    <Button type="submit" variant="contained">Submit</Button>
                </div>
            </form>
        </Popup>

        <Popup trigger={createPopup} setTrigger={setCreatePopup}>
            <h3>Neuen User erstellen</h3>
            <form className='createContent' autoComplete='off' onSubmit={createUser}>
                {AdminUserInput.map((input) =>(
                    <FormInput
                        key={input.id}
                        {...input}
                        onChange={handleOnChange} />
                ))}
                <FormInput key={pwdInput.id} label="Passwort" {...pwdInput} onChange={handlePwdChange} />
                
                <div className="createExtra">
                    <label>
                        Admin: 
                        <input className="adminCheck" type="checkbox" onChange={handleChange} />
                    </label>
                    
                </div>
                <div className='submitButton'>
                    <Button type="submit" variant="contained">Submit</Button>
                </div>
                
            </form>
        </Popup>

        <Popup trigger={passwordPopup} setTrigger={setPasswordPopup}>
            <h3>Neues Passwort eingeben:</h3>
            <form className="updatePWD" noValidate onSubmit={setPWD}>
                <FormInput key={pwdInput.id} {...pwdInput} onChange={handlePwdChange} />
                <div className='submitButton'>
                    <Button type="submit" variant="contained">Submit</Button>
                </div>  
            </form>
        </Popup>

    </>
    )
}

export default AdminUserData;