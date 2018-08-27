import React, { Component } from 'react';
import axios from '../axios';
class GirlImage extends Component {
    state = {
    }

    validate = (event) => {

        const owner = this.props.user;
        const content = this.refs.comment.value;   
        const comment = {user : owner, content : content}   
        const string = this.props.path;
        axios
        .put('/api/images/'+string,{
            comment : comment
        })
        .then(data =>{
        })
        .catch(err => console.log(err));
    }


    displayComment = ()=>{
        console.log(this.props.visibleComment);
        console.log(this.props.invisibleComment);
        
        const comment =this.props.img ? this.props.img.comment.map(comment => <p><span class="font-weight-bold">{comment.user.name}</span> : {comment.content}</p> ) : "";        
        const name = this.props.user ? this.props.user.name : "Person";
        if(this.props.visibleComment){
            return (
            <div>
                {comment ? comment : ""}
                <div >
                    <span class="font-weight-bold">{name}</span> 
                    <input type="text" ref="comment" class="form-control" placeholder="Your comment" />
                    <button type="submit" className="btn btn-success invisible"  >Send </button>
                </div>
            </div>
            );
        }
        else if(this.props.invisibleComment){
            return "";
        }
}

    render() {    
    
    
        
     
    

    return (
        <form onSubmit={this.validate}>
            <div className="container bg-white" >
                <div className="">                
                    <img className="img-fluid round d-block m-auto w-100"
                        src={this.props.img ? this.props.img.imageUrl : ""} alt={this.props.img ? this.props.img.imageUrl : ""} />

                    <div className="clearfix">
                        <div>
                            <img className="rounded-circle m-4 w-25 float-left" src={this.props.img ? this.props.img.imageUrl : ""} alt={this.props.img ? this.props.img.imageUrl : ""} />
                        </div>
                        <div>
                            <h5 className="mt-0 text-primary ml-auto mr-auto">Media heading</h5>
                            Cras sit
                        </div>
                        
                    </div>
                    <div className="container mt-3 mb-3">
                        <p>{this.props.img ? this.props.img.description : ""}</p>
                    </div>
                    {this.displayComment()}
                </div>
            </div>
             </form>


        );
    }
}

export default GirlImage