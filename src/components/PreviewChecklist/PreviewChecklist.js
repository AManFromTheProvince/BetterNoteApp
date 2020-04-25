import React from 'react';
import PreviewOptions from '../PreviewNote/PreviewOptions/PreviewOptions';
import TagRow from '../TagRow/TagRow';
import CheckItemList from './CheckItemList/CheckItemList';
import './PreviewChecklist.css'

const PreviewChecklist = ({openNote, saveNote, deleteNote, onEditTag, style, editStatus, tagTyped, saveTag, addTag
    ,noteData, deleteTag, checkOff, writeNote, writeChecklist, deleteChecklist,addChecklist}) => {
    return(
        <div className = "bg-note">
            <div className = "preview-note">
                <PreviewOptions 
                    openNote = {openNote}
                    saveNote = {saveNote}
                    deleteNote = {deleteNote}
                    onEditTag = {onEditTag}
                    style = {style}
                    editStatus ={editStatus}/>
                {
                    editStatus &&
                    <input 
                    type = "text"
                    placeholder = "Enter new tag here..."  
                    id = "tag-input"
                    value = {tagTyped}
                    onKeyDown={saveTag}
                    onChange={addTag}></input>
                }

                <div className = "tags">
                {
                    noteData.tags.length > 0 ?
                    <TagRow tag = {noteData.tags} style = {style} editStatus = {editStatus} deleteTag = {deleteTag}></TagRow> :
                    <p className = "no-tags">No tags found</p>
                }
                </div>
                
                <div className = "title-checklist">
                    <input 
                    type = "text" 
                    value = {noteData.title} 
                    name = "title"
                    onChange = {writeNote}
                    placeholder = "Title"
                    />
                    <span 
                    className = "material-icons" 
                    style = {{color:style.color, backgroundColor: style.backgroundColor}}
                    onClick = {addChecklist}>add</span>
                </div>

                <CheckItemList 
                checkOff ={checkOff} 
                items = {noteData.content} 
                style = {style}
                writeChecklist = {writeChecklist}
                deleteChecklist = {deleteChecklist}></CheckItemList>
                
                <p className = "modified-preview">Last modified on {noteData.modified}</p>
            
            </div>
        </div>
    )
}

export default PreviewChecklist;