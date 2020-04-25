import React from 'react';
import SmallNotes from '../SmallNotes/SmallNotes';
import './SmallNoteFeed.css';


const SmallNoteFeed = ({data, saveNote, clickedNote, colorPalette}) => {
    return(
        <div className = "notes-feed">
            {
            data.map((note, i)=>{
                return <SmallNotes 
                key = {i} 
                note = {note} 
                id = {note.id}
                saveNote = {saveNote}
                colorPalette = {colorPalette} 
                clickedNote = {clickedNote}/>
            })
            }
        </div>
    )
   
}

export default SmallNoteFeed;