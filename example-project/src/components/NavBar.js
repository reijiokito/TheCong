import React, { Component } from 'react';
import SeachField from './SearchField'
import logo from '../img/Logo.png';
import ProfilePanel from './ProfilePanel';


class NavBar extends Component {
    

    render() {
        return (
            
            <div className="navbar">
                <div className="container">
                    <SeachField onsearchChanged={this.props.onsearchChanged} />
                    <span className="text-center">
                        <img src={logo} alt="Techkid Logo" />
                    </span>
                    <ProfilePanel user={this.props.user} isLogin={this.props.isLogin} isBeginLogin={this.props.isBeginLogin}/>
                </div>
            </div>
        );
    }
}

export default NavBar