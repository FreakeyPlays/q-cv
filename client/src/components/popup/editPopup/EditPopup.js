import Popup from "../Popup";
import { MuiThemeProvider, Button } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import FormInput from "../../formInput/FormInput";

const theme = createTheme({
    palette: {
        secondary: {
            main: "#333"
        }
      },
});

const EditPopup = (props) => {

    return(
        <Popup trigger={props.triggerVar} setTrigger={props.setTriggerFunc}>
            <h3>Edit</h3>
            <form className="updateContent" noValidate onSubmit={props.onSubmitFunc}>
                {props.inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={props.item[input.name]}
                        onChange={ (e) => props.setUpdateItem({...props.item, [e.target.name]: e.target.value})} />
                ))}
                <MuiThemeProvider theme={theme}>
                    <Button 
                        type="submit"
                        color="secondary"
                        variant="contained">
                            Change
                    </Button>
                </MuiThemeProvider>
            </form>
        </Popup>
    )
}

export default EditPopup;