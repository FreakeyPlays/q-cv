import React, {useState, useEffect} from 'react'
import { userDataService } from '../../services/user.services';
import { faPen, faTrash} from '@fortawesome/free-solid-svg-icons'
import './AdminUSerData.css';
import {userInput} from './userInput.js';
import Popup from '../../components/popup/Popup.js';
import Titlebar from '../../components/titlebar/Titlebar';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField } from '@material-ui/core';
import FormInput from '../../components/formInput/FormInput';

const AdminUserData = () =>{
    //State Variales section
    const [users, setUsers] = useState([]); //stored User Datas
    const [selectedUser, setUserID] = useState(""); //stores selected User ID
    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
        eMail:"",
        password:"",
        isAdmin:""
    }); //cache for used user

    //update state variables
    const [newFirstName, setFirstName] = useState("");
    const [newLastName, setLastName] = useState("");
    const [newEMail, setEMail] = useState("");
    const [newPassword, setPassword] = useState("");
    const [updatePopup, setUpdatePopup] = useState(false);
    
    useEffect(() =>{
        retrieveUsers()
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
        

        for(let i = 0; i < 4; i++){ //adding new data into cache
            cach[e.target[i].name] = e.target[i].value;
        }
        cach["_id"] = selectedUser;          //set userid into cache --> Important for API call
        
        //update Api call
        userDataService.updateUser(cach).then(() => window.location.reload(false)).catch((e) => console.log(e));
    }

    function handleOnChange(e){
        setUser({...user, [e.target.name]: e.target.value});
    }

    return(
    //divided into first the normal page and after into extra pages like Popups etv.
    // isAdmin option for update still missing
    <>
        <div className="main">
            <div className='mainHeader'>
                <Titlebar></Titlebar>
            </div>
            <div className="userList">
            <Container>
                <Form>
                <Row>
                    {users.map((item,index) =>{
                        return(
                            <Col key={index}>
                                <Card className="userBox">
                                <Card.Body>
                                        <Card.Header as="h4">{item.firstName} {item.lastName}</Card.Header>
                                        <Card.Text>ID: {item._id}</Card.Text>
                                        <Card.Text>E-Mail: {item.eMail}</Card.Text>
                                        <Card.Text>Password: {item.password}</Card.Text>
                                        <footer className='cardFooter'>
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
                                        </footer>
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
                {userInput.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={user[input.name]}
                        onChange={handleOnChange} />
                ))}

                <button>Submit</button>
            </form>
        </Popup>
    </>
    )
}

export default AdminUserData;