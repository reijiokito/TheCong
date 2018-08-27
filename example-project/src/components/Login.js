import React, { Component } from 'react';
import axios from '../axios';
import SignUp from './SignUp';

class Login extends Component {
    state = {
        isSignUp : false
    }

    onSubmited = (event) => {
        event.preventDefault();
        axios
            .post('/api/login', {
                username: this.refs.username.value,
                password: this.refs.password.value
            })
            .then(data => {  
                this.props.changeIsLogin();
                this.props.getUser(data.data.userId);
            })
            .catch(err => console.log(err))
    }

    signup = () => {
        if(!this.state.isSignUp)
            this.setState({isSignUp : true});
        else
        this.setState({isSignUp : false});
    }

    begin = () =>{
        if(this.state.isSignUp){
            return <SignUp signup={this.signup}/>;
        }
        else{
            return (
                <div className="modal-dialog text-center">
                    <div className="col-sm-8 main-section">
                        <div className="modal-content">
                            <form className="col-12" onSubmit={this.onSubmited}>
                                <div className="form-group">
                                    <i className="fas fa-user" id="icon1"></i>
                                    <input type="text" ref="username" id="username" className="form-control" placeholder="Enter Username" />
                                </div>
                                <div className="form-group">
                                    <i className="fas fa-lock" id="icon2"></i>
                                    <input type="password" ref="password" id="password" className="form-control" placeholder="Enter Password" />
                                </div>
                                <button type="submit" className="btn btn-success" id="userLogin">
                                    <i className="fas fa-sign-in-alt"></i> Login </button>
                            </form>
                            <div className="col-12 forgot">
                                <form className="col-12" onSubmit={this.signup}>
                                    <button type="submit" className="btn btn-primary">Sign up</button>
                                </form>
                            </div>                        
                        </div>
                    </div>
                </div>
            );
        }
    }

    render() {
        return(
            <div>
                {this.begin()}
            </div>
        );
    }

}

export default Login;