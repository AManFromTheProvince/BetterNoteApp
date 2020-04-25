import React from 'react';
import './CheckItem.css'

const CheckItem = ({id, style, checked, content, checkOff, writeChecklist, deleteChecklist}) => {
    const checkedStyle = {border: `3px solid ${style.backgroundColor}`, backgroundColor : style.backgroundColor}
    const uncheckedStyle = {border: `3px solid ${style.backgroundColor}`}
    const checkmarkStyle = {borderColor : style.color}
    const inputStyle = {
        width: "85%",
        paddingTop: "0.2em",
        fontSize: "18px",
        fontWeight: "200",
        marginLeft: "1.4em"
    }
    return(
        <div className = "check-item">
           
            <div className = "checkbox" onClick = {()=>checkOff(id)}>
                <div 
                className = {checked ? "fake-checkbox checked" : "fake-checkbox"} 
                style = {checked ? checkedStyle : uncheckedStyle}>
                    <div 
                    className = {checked ? "checkmark" : undefined}
                    style = {checked ? checkmarkStyle : undefined}>
                    </div>
                
                </div>
                
            </div>
            
            <input 
            style = {inputStyle} 
            id = {checked ? "checked-task" :  "unchecked-task"}
            disabled = {checked ? true : false} 
            value = {content}
            onChange = {(event)=>writeChecklist(event, id)}/>
            
            <span 
            className = "material-icons delete-notes" 
            style={{color:style.color}}
            onClick = {()=>deleteChecklist(id)}>clear</span>
        </div>
    )
}

export default CheckItem;