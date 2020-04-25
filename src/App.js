import React from 'react';
import './App.css';
import TopBar from './components/TopBar/TopBar';
import SelectType from './components/SelectType/SelectType';
import SmallNoteFeed from './components/SmallNoteFeed/SmallNoteFeed';
import PreviewNote from './components/PreviewNote/PreviewNote';
import AddNote from './components/AddNote/AddNote';
import StatusMessage from './components/StatusMessage/StatusMessage';
import PreviewChecklist from './components/PreviewChecklist/PreviewChecklist';



const colorPalette = {
  "red" : {"bg" : "#f0b5ba", "color" : "#d2202f"},
  "blue" : {"bg" : "#b5d8f0", "color" : "#006fbe"},
  "green" : {"bg" : "#d6f6d3", "color" : "#0d9f00"},
  "yellow" : {"bg" : "rgba(255, 255, 0, 0.3)", "color" : "#b0a200"},
  "purple" : {"bg" : "#c4a6ed", "color" : "#4c00b8"}

}


class App extends React.Component{
  constructor(){
    super()
    this.state = {
      notesList:[], //list of notes that fall under category "notes"
      notes: [],  //global list of all notes (both notes and checklists)
      checklist: [], //list of notes that fall under the category "checklist"
      resultNotes: [], //list of notes that is used to show up on the UI
      search: "",   //value of search bar
      openNote : false, //indicates if we're opening a note/checklist
      opened: {}, //holds the note we're currently viewing, use this if we're also editing
      modifyingNote: 0, //index of the note with respect to its type. for example, index 0 for notes is different from index 0 for checklist
      noteTab: true,    //note tab is the one we're viewing
      checklistTab: false,  // checklist tab is the one we're viewing 
      editTag: false,   //we're currently editing tags
      tagTyped: "",   //the tag currently typed by the user
      statusMessage : "",   //status message is used to notify user
      success : false,    //success of the operation done by the user
      displayStatusMessage: false //handles whether status should appear or not
    }
  }

  categorizeNote = (data, type) => {
    const notes = data.filter(data=>{
      return data.type === "notes"
    })
    const checklist = data.filter(data=>{
      return data.type === "checklist"
    })
    if (type === "notes"){
      this.setState({notes:notes, checklist : checklist, resultNotes:notes, notesList:data})
    } else {
      this.setState({notes:notes, checklist : checklist, resultNotes:checklist, notesList:data})
    }
  }

  componentDidMount(){
    fetch("https://api.jsonbin.io/b/5e81c63f862c46101ac0aa32/latest")
    .then(response=>response.json())
    .then((data)=>{
      this.categorizeNote(data, "notes")
      this.displayStatus("Finished loading data", true)
    })
    .catch(err=>console.log(err))


  }

  addEmptyNote = () => {
    let emptyNote = {
      "type" : "notes",
      "id" : (this.state.notesList.length).toString(),
      "title" : "",
      "content" : "",
      "modified" : "",
      "color" : "yellow",
      "tags" : []
    }

    let allNotes = this.state.notesList
    let notes = this.state.notes
    notes.push(emptyNote)
    allNotes.push(emptyNote)

    this.setState({notes: notes, notesList: allNotes, opened: JSON.parse(JSON.stringify(emptyNote)), 
      modifyingNote: notes.length-1, openNote : true, editTag : false,
      noteTab: true, checklistTab: false, resultNotes: notes})
  }

  addEmptyChecklist = () => {
    let emptyChecklist = {
      "type" : "checklist",
      "id" : (this.state.notesList.length).toString(),
      "title" : "",
      "content" : [],
      "modified" : "",
      "color" : "yellow",
      "tags" : []
    }

    let allNotes = this.state.notesList
    let checklist = this.state.checklist
    checklist.push(emptyChecklist)
    allNotes.push(emptyChecklist)

    this.setState({checklist: checklist, notesList: allNotes, opened: JSON.parse(JSON.stringify(emptyChecklist)), 
      modifyingNote: checklist.length-1, openNote : true, editTag : false,
    noteTab: false, checklistTab: true, resultNotes: checklist})
  }

  displayStatus(message, success){
    this.setState({statusMessage: message, success: success, displayStatusMessage: true})
    setTimeout(()=>{
      this.setState({statusMessage: "", success: false, displayStatusMessage: false})
    }, 6000)
  }

  findNote = (id) => {  
    for (let i = 0; i < this.state.notes.length; i++){
      if (id === this.state.notes[i].id){
        return {index: i, type : "notes"};
      }
    }

    for (let i = 0; i < this.state.checklist.length; i++){
      if (id === this.state.checklist[i].id){
        return {index: i, type : "checklist"}
      }
    }
    return {index: -1};
  }

  findNoteType = () => {
    if (this.state.opened.type === "notes"){
      return this.state.notes
    } else {
      return this.state.checklist
    }
  }

  updateNote = (listNotes) => {
    if (this.state.opened.type === "notes"){
      this.setState({
              notes: listNotes
      })
    } else {
      this.setState({
        checklist: listNotes
      })
    }
  }

  saveNote = () =>{
    let date = new Date()
    let listNotes = this.state.notesList
    
    let oldModifyingList = this.findNoteType()
    let newModifyingList = this.findNoteType()
    let openedNote = this.state.opened;
    openedNote.modified = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()+ " " + 
      (date.getHours()%12) + ":" + date.getMinutes() + " " + (date.getHours() >= 12 ? "PM" : "AM")
    listNotes[Number(this.state.opened.id)] = openedNote
    newModifyingList[this.state.modifyingNote] = openedNote
    this.updateNote(newModifyingList)


    fetch("https://api.jsonbin.io/b/5e81c63f862c46101ac0aa32/", 
    {
      method: "PUT",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(listNotes)
    })
    .then(response=>response.json())
    .then(data=>{
      if (data.success){
        this.setState({opened: openedNote})
        this.categorizeNote(listNotes, openedNote.type)
        this.displayStatus("Successfully saved changes", true)
      } else {
        this.displayStatus("Changes were not saved", false)
        this.updateNote(oldModifyingList)
      }
    })
  }

  writeNote = (event) => {
    let modifyingNote = this.state.opened;
    modifyingNote[event.target.name] = event.target.value;
    this.setState({
      opened: modifyingNote
    })
  }

  deleteNote = () => {
    let listNotes = this.state.notesList
    listNotes.splice(Number(this.state.opened.id), 1)
    let oldModifyingList = this.findNoteType()
    let newModifyingList = this.findNoteType()
    newModifyingList.splice(this.state.modifyingNote, 1)
    this.updateNote(newModifyingList)
    let tab;
    if (this.state.checklistTab){
      tab = "checklist"
    } else {
      tab = "notes"
    }
    

    fetch("https://api.jsonbin.io/b/5e81c63f862c46101ac0aa32/", 
    {
      method: "PUT",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(listNotes)
    })
    .then(response=>response.json())
    .then(data=>{
      console.log(data)
      if (data.success){
        this.categorizeNote(listNotes, tab)
        this.displayStatus("Successfully saved changes", true)
      } else {
        this.displayStatus("Changes were not saved", false)
        this.updateNote(oldModifyingList)
      }
    })
  }

  clickedNote = (id) =>{
    let notesResult = this.findNote(id)
    if (notesResult.index === -1){
      this.setState({
        openNote : !this.state.openNote,
        editTag : false
      })
    } else {
      this.setState({
        openNote: !this.state.openNote,
        editTag : false,
        modifyingNote: notesResult.index
      })
      if (notesResult.type === "notes"){
        this.setState({
          opened: JSON.parse(JSON.stringify(this.state.notes[notesResult.index])),
        })
      } else {
        this.setState({
          opened: JSON.parse(JSON.stringify(this.state.checklist[notesResult.index])),
      })
      }
    }
  }

  switchTab = (event) => {
    if (event.target.title === "notes"){
      this.setState({noteTab : true, checklistTab : false, resultNotes: this.state.notes})
    } else {
      this.setState({noteTab: false, checklistTab : true, resultNotes: this.state.checklist})
    }
  }

  onEditTag = () => {
    this.setState({editTag: !this.state.editTag})
  }

  saveTag = (event) => {
    if (event.key === "Enter" && this.state.tagTyped){
      let modifyingNote = this.state.opened
      modifyingNote.tags.push(event.target.value)
      this.setState({opened:modifyingNote, tagTyped : ""})
      this.displayStatus("Successfully added tag", true)
    }
  }

  addTag = (event) => {
    this.setState({tagTyped: event.target.value})
  }

  deleteTag = (id) => {
    let modifyingNote = this.state.opened
    modifyingNote.tags.splice(id, 1)
    this.setState({opened: modifyingNote})
    this.displayStatus("Successfully deleted tag", true)
  }

  checkOff = (id) => {
    let openedChecklist = this.state.opened;
    openedChecklist.content[id].checked = !openedChecklist.content[id].checked
    this.setState({opened: openedChecklist})  
  }

  writeChecklist = (event, id) => {
    let modifyingNote = this.state.opened;
    modifyingNote.content[id].description = event.target.value
    this.setState({opened : modifyingNote})
  }

  deleteChecklist = (id) => {
    let modifyingNote = this.state.opened;
    modifyingNote.content.splice(id, 1)
    this.setState({opened: modifyingNote})
    this.displayStatus("Successfully deleted task", true);
  }

  addChecklist = (event) => {
    let modifyingNote = this.state.opened
    modifyingNote.content.push({"checked" : false, "description" : ""})
    this.setState({opened: modifyingNote})
  }

  searchNote = (event) => {
    this.setState({search: event.target.value})
    if (event.target.value !== ""){
      const result = this.state.notesList.filter((notes)=>{
        return notes.title.toLowerCase().includes(event.target.value.toLowerCase())
      })
      this.setState({resultNotes: result})
    } else {
      if (this.state.noteTab){
        this.setState({resultNotes: this.state.notes})
      } else {
        this.setState({resultNotes: this.state.checklist})
      }

    }
   
    
  }

  render(){
    return(
      <div className = "app">
        <TopBar search = {this.searchNote} searchValue = {this.state.search}/>
        
        {
        !this.state.search 
        ?
        <SelectType
        switchTab = {this.switchTab}
        noteTab = {this.state.noteTab}
        checklistTab = {this.state.checklistTab}
        />
        :
        <div className = "selection-tab">
          <h5>Results</h5>
        </div>
        }
        {
          this.state.resultNotes.length > 0 &&
            <SmallNoteFeed 
            data = {this.state.resultNotes} 
            saveNote = {this.saveNote}
            clickedNote = {this.clickedNote}
            colorPalette = {colorPalette}
            />
        }

        {
          (this.state.openNote && this.state.opened.type === "notes" ) &&
          <PreviewNote 
              noteData = {this.state.opened} 
              style = {{backgroundColor : colorPalette[this.state.opened.color].bg, 
                color: colorPalette[this.state.opened.color].color}} 
              openNote = {this.clickedNote} 
              saveNote = {this.saveNote}
              writeNote = {this.writeNote}
              deleteNote = {this.deleteNote}
              onEditTag = {this.onEditTag}
              editStatus = {this.state.editTag}
              saveTag = {this.saveTag}
              tagTyped = {this.state.tagTyped}
              addTag = {this.addTag}
              deleteTag = {this.deleteTag}
          />
        }
        {
          (this.state.openNote && this.state.opened.type === "checklist") &&
          <PreviewChecklist
          noteData = {this.state.opened} 
          style = {{backgroundColor : colorPalette[this.state.opened.color].bg, 
            color: colorPalette[this.state.opened.color].color}} 
          openNote = {this.clickedNote}
          saveNote = {this.saveNote}
          deleteNote = {this.deleteNote}
          onEditTag = {this.onEditTag}
          editStatus ={this.state.editTag}
          tagTyped = {this.state.tagTyped} 
          saveTag = {this.saveTag} 
          addTag = {this.addTag}
          deleteTag = {this.deleteTag}
          checkOff = {this.checkOff}
          writeNote = {this.writeNote}
          writeChecklist = {this.writeChecklist}
          deleteChecklist = {this.deleteChecklist}
          addChecklist = {this.addChecklist}
          />
        }
      {
        !this.state.openNote &&
        <AddNote addEmptyNote = {this.addEmptyNote} addEmptyChecklist = {this.addEmptyChecklist}></AddNote>
      }
      {
        this.state.displayStatusMessage &&
        <StatusMessage message = {this.state.statusMessage} success = {this.state.success}></StatusMessage>
      }
      </div>
    );
  }
}

export default App;
