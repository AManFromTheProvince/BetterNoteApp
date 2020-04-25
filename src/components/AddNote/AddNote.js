import React from 'react';
import './AddNote.css'

class AddNote extends React.Component {

    constructor(){
        super()
        this.state = {
            openAddNote: false
        }
    }


    onAddEmptyNote = () =>{
        this.setState({openAddNote : !this.state.openAddNote})
    }


    render(){
        const addEmptyNote = this.props.addEmptyNote;
        const addEmptyChecklist = this.props.addEmptyChecklist
        return(
            <div className = "add-note">
            
            {
            !this.state.openAddNote ?
            <button className = "add-button" onClick = {this.onAddEmptyNote}>
                <span className = "material-icons add-icon">add</span>
                Add a note
            </button>
            :
            <div className = "add-options">
                <span className = "material-icons" onClick = {this.onAddEmptyNote}>clear</span>
                <span className = "material-icons" onClick = {addEmptyNote}>description</span>
                <span className = "material-icons" onClick = {addEmptyChecklist}>list</span>
            </div>
            } 
            </div>
        )
    }
}

export default AddNote;