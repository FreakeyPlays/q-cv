import React from 'react';
import './Popup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function Popup(props) {
    return (props.trigger) ? (
        <div className='popup'>
            <div className='innerPopup'>
                <div className='closeBtn' onClick={() => props.setTrigger(false)}><FontAwesomeIcon className='closeIcon' icon={faX} /></div>
                { props.children }
            </div>
        </div>
    ) : '';
}

export default Popup