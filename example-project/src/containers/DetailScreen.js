import React, { Component } from 'react';
import GirlImage from '../components/GirlImage';
import axios from '../axios';

class DetailScreen extends Component {
    state = {        
        path : "",
        visibleComment : true
    }

    componentDidMount() {
        axios
            .get(`/api/images/${this.props.match.params.imageId}`)
            .then(data => {                          
                this.setState({
                    image: data.data.image,
                    path : this.props.match.params.imageId
                });
            })
            .catch(err => console.log(err));
    }
    

    render() {        
        return (
            <div>                
                <div className="main_content container">
                    <div className="row">
                        <div className=" col-8 ml-auto mr-auto" >
                            <GirlImage img={this.state.image} user={this.props.user} path={this.state.path} visibleComment={this.state.visibleComment}/>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default DetailScreen;