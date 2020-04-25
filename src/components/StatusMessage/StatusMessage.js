import React from 'react';
import './StatusMessage.css';

const StatusMessage = ({message, success}) => {

    return(
        <div className = {success ? "status-message success-message open" : "status-message fail-message open"}>
            <span className = {success ? "material-icons success" : "material-icons fail"}>
                {success ? "check" : "cancel"}
            </span>
            <p className = {success ? "success" : "fail"}>{message}</p>
        </div>
    )
}

export default StatusMessage;