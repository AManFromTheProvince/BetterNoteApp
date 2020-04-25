import React from 'react';
import './Tags.css'


const Tags = ({tag, style, editStatus, deleteTag, id}) => {
    return(
        <div 
        className = {editStatus ? "tag delete-tag" : "tag"} 
        style = {style}
        onClick = {()=>
            {
                if (editStatus){
                    deleteTag(id)
                }
            }
        }>
            <p>{tag}</p>
        </div>  
    );
}

export default Tags;