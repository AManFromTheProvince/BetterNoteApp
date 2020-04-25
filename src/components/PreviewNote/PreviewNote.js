import React from 'react';
import './PreviewNote.css';
import TagRow from '../TagRow/TagRow';
import PreviewOptions from './PreviewOptions/PreviewOptions';

const PreviewNote = ({noteData,style, openNote, saveNote, writeNote, deleteNote, onEditTag, editStatus, 
    saveTag, tagTyped, addTag, deleteTag}) =>{
    return(
        <div className = "bg-note">
            <div className = "preview-note" >
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

                <input 
                type = "text" 
                value = {noteData.title} 
                name = "title"
                onChange = {writeNote}
                placeholder = "Title"
                />
                    

                <textarea 
                value = {noteData.content} 
                name = "content"
                onChange = {writeNote}
                id = {editStatus ? "adjusted" : undefined}
                placeholder = "Enter anything here...."
                ></textarea>
                <p className = "modified-preview">Last modified on {noteData.modified}</p>
            </div>
        </div>
    );
}

export default PreviewNote;