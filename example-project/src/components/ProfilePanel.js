import React, { Component } from 'react';
import axios from '../axios';
class ProfilePanel extends Component {
    onLogout = () => {
        axios
            .get("/api/logout")
            .then(data => {
                window.location.href = "http://localhost:3000/";
            })
            .catch(err => console.log(err))
    }
    display = () => {      
        if(!this.props.isLogin){
            return (
            <div>   
                <button className="btn btn-success" onClick={this.props.isBeginLogin}>
                Login
                </button>
            </div>);
        }
        else{
            return (
                <div>
                    <div>
                        <span className="navbar-text">Wellcome, {this.props.user.name} </span>
                    </div>
                    <button className="btn btn-danger" onClick={this.onLogout}>
                        Logout
                    </button>
                </div>
            );
        }
    } 
    render(){
        return (
            <div className="col-3 profile_panel">
                {this.display()}
            </div>
        );
    }
}

export default ProfilePanel