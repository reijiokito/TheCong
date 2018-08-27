import React, { Component } from 'react';
import axios from '../axios';

class SignUp extends Component {
    
    onSubmited = (event) => {
        event.preventDefault();
        axios
            .post("/api/users",{
                username : this.refs.username.value,
                email : this.refs.email.value,
                password : this.refs.password.value,
                name : this.refs.name.value,
                avatarUrl : this.refs.avatarUrl.value
                    
            })
            .then(data =>{
                this.props.signup();

            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="modal-dialog text-center">
                <div className="col-sm-8 main-section">
                    <div className="modal-content">

                        <form className="col-12" onSubmit={this.onSubmited}>
                            <div className="form-group">
                                <i className="fas fa-user" id="icon1"></i>
                                <input type="text" ref="username" className="form-control" placeholder="Enter Username" />
                            </div>
                            <div className="form-group">
                                <i className="fas fa-lock" id="icon2"></i>
                                <input type="password" ref="password" className="form-control" placeholder="Enter Password" />
                            </div>
                            <div className="form-group">
                                <input type="email" ref="email" className="form-control" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <input type="text" ref="name" className="form-control" placeholder="Enter Name" />
                            </div>
                            <div className="form-group">
                                <input type="text" ref="avatarUrl" className="form-control" placeholder="Avatar link" />
                            </div>
                            <button type="submit" className="btn btn-success" id="signUp">
                                <i className="fas fa-sign-in-alt"></i> Sign Up </button>
                        </form>                        
                    </div>
                </div>
            </div>
        );
    }

}

export default SignUp;