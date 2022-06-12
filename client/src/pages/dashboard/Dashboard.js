import UserService from "../../services/keycloakUser.service.js";

const Dashboard = () => {
    return(
        <button onClick={UserService.getAdminToken}>TEST</button>
    )
}

export default Dashboard;