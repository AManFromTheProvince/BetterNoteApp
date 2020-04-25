import React from 'react';
import Tags from '../Tags/Tags';
import './TagRow.css';


const TagRow = ({tag, style, editStatus, deleteTag}) => {
    return(
        tag.map((tag,i)=>{
            return <Tags key = {i} id = {i} style = {style} tag = {tag} editStatus = {editStatus} deleteTag = {deleteTag}></Tags>
        })
        
    )
}

export default TagRow;