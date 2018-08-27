import React, { Component } from 'react';
import '@fortawesome/fontawesome-free//css/all.css';
class SearchField extends  Component{
    _handleTextChange = event  =>  this.props.onsearchChanged(event.target.value);
    render(){
        return(
            <form className="col-3">
                <div>
                    <i className="fas fa-search ma" ></i>
                    <input onChange={this._handleTextChange} className="form-control mw-20" type="text" placeholder="Search" />
                    
                </div>
            </form>
        );
    }
}

export default  SearchField