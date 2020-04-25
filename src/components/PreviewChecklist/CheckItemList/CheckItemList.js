import React from 'react';
import CheckItem from '../CheckItem/CheckItem';
import './CheckItemList.css'

const CheckItemList = ({checkOff, items, style, writeChecklist, deleteChecklist}) => {
    return(
        <div className = 'checklist-div'>
        {
            items.map((item, i)=>{
                return <CheckItem 
                key = {i}
                id = {i}
                checked={item.checked} 
                content = {item.description}
                checkOff = {checkOff}
                writeChecklist = {writeChecklist}
                deleteChecklist = {deleteChecklist}
                style = {style}/>
            })
        }
        </div>
    )
}


export default CheckItemList;