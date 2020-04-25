import React from 'react';
import './SelectType.css';

const SelectType = ({switchTab, noteTab, checklistTab}) => {
    return(
        <div className = "selection-tab">
            <h5 
            title = "notes" 
            id = {noteTab ? "active-tab": undefined}
            onClick = {switchTab}>
            Notes
            </h5>
            <h5 
            title = "checklist" 
            id = {checklistTab ? "active-tab": undefined}
            onClick = {switchTab}>
            Checklist
            </h5>

        </div>
    )
}

export default SelectType;