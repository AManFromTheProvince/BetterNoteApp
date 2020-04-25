import React from 'react';
import './TopBar.css';

class TopBar extends React.Component {
    constructor(){
        super()
        this.state = {
            searching: false
        }
    }

    handleSearchClick = () => {
        this.setState({
            searching: !this.state.searching
        })
    }


    render(){
        const search = this.props.search
        const searchValue = this.props.searchValue
        return(
            <div className = "top-bar">
                <div className = "bar-actions">
                    <h2>Notes</h2>
                    <span 
                    className = "material-icons search-icon"
                    onClick = {this.handleSearchClick}
                    >{!this.state.searching ? "search" : "clear"}</span>
                </div>

                <div className = "bar-full">
                    <input type = "text" 
                    placeholder = "Search your notes by title"
                    value = {searchValue}
                    onChange ={search}>
                    </input>
                   
                </div>
                {

                    this.state.searching &&
                    <div className = "search-box">
                        <input type = "text" 
                        placeholder = "Search your notes by title"
                        value = {searchValue}
                        onChange ={search}>
                        </input>
                    </div>
                }
    
            </div>
        );
    }
}

export default TopBar;