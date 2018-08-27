import React, { Component } from 'react';
import GirlImage from './GirlImage';
import { Link } from 'react-router-dom';

class MainContent extends Component {
    state = {
        invisibleComment : true
    }
    
    render() {
        const user = this.props.user;
        const allImages = this.props.images.map(img => (
            <div className="col-3 " key={img._id} >            
                <Link to={`/images/${img._id}`}>                    
                    <GirlImage  user={user} img={img} invisibleComment={this.state.invisibleComment}/>
                    
                </Link>
            </div>
        ));
        return (
            <div className="container mt-3">
                <div className="row">
                    {allImages}
                </div>
            </div>
        );
    }

}

export default MainContent;