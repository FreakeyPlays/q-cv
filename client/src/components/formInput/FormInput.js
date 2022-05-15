import { useState } from "react";

import "./FormInput.css";

const FormInput = (props) => {
    const [notFocused, setNotFocused] = useState(false);
    const { label, errorMessage, onChange, id, customClass, type, ...inputProps } = props;

    return(
        <div className={"formInput " + customClass}>
            <label>{label}</label>
            {type === "textarea" ? 
                <textarea 
                    type={type}
                    {...inputProps} 
                    onChange={onChange} 
                    onBlur={() => setNotFocused(true)}
                    focused={notFocused.toString()}
                ></textarea>
             : <input 
                    type={type}
                    {...inputProps} 
                    onChange={onChange} 
                    onBlur={() => setNotFocused(true)}
                    focused={notFocused.toString()}
                ></input>
            }
            <span>{errorMessage}</span>
        </div>
    )
}

export default FormInput;