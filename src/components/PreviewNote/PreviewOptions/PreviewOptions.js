import React from 'react';


const PreviewOptions = ({openNote, onEditTag, style, editStatus, saveNote, deleteNote}) => {
    return(
            <div className = "options">
                <span  className = "material-icons" onClick = {openNote}>
                    clear
                </span>
                <div className = "other-options">
                    <div className = "edit-tag" onClick = {onEditTag}>
                        <button style = {style}> 
                            <span  
                            className = "material-icons edit-icon" 
                            style = {{color: style.color}}>
                            {editStatus ? "clear" : "edit"}
                            </span>
                            {editStatus ? "Cancel" : "Edit tags"}
                        </button>
                    </div>
                    <span  className = "material-icons" onClick = {saveNote}>
                        save
                    </span>
                    <span  className = "material-icons" 
                    onClick = {()=>{
                            openNote(0)
                            deleteNote()
                        }
                    }
                    >
                        delete
                    </span>
                </div>
        </div>
    )
}

export default PreviewOptions;