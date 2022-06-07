import Popup from "../Popup";
import { MuiThemeProvider, Button } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#333'
        }
      },
});

const DeletePopup = (props) => {
    return(
        <Popup trigger={props.triggerVar} setTrigger={props.setTriggerFunc}>
            <h3>Do you want to Delete this Item?</h3>
                <MuiThemeProvider theme={theme}>
                        <Button 
                            onClick={props.deleteFunc}
                            variant="outlined" 
                            color="secondary"
                        >
                            DELETE
                        </Button>
                </MuiThemeProvider>
        </Popup>
    )
}

export default DeletePopup;