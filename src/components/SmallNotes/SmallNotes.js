import React from 'react';
import './SmallNotes.css';
import TagRow from '../TagRow/TagRow';


const SmallNotes = ({note, id, clickedNote, colorPalette}) => {
        const style = {
            backgroundColor : colorPalette[note.color].bg,
            color : colorPalette[note.color].color
        }

        return(
            <div className = "div-notes">
                <div className = "small-notes" onClick = {()=>clickedNote(id)}>
                    <span className = "small-notes-thumbnails" style = {style}>&nbsp;</span>
                    <div className = "details">
                        <p className = "note-text-thumbnail">{note.title}</p>
                        <p className = "note-text-italics-thumbnail">Last modified on {note.modified}</p>
                        <div className = "tags-row">
                            {
                                note.tags.length > 0 ?
                                <TagRow tag = {note.tags} style = {style}></TagRow> :
                                <p className = "no-tags">No tags found</p>
                            }
                        </div>
                    </div>
                </div>
               
            </div>
        );
}

export default SmallNotes;