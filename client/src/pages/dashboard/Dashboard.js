import Titlebar from "../../components/titlebar/Titlebar";

const Dashboard = () => {
    return(
        <>
            <Titlebar 
                searchbar={false} 
                showAll={false}
                path="/create-cv" 
            />
        </>
    )
}

export default Dashboard;