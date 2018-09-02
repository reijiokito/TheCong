import React, { Component } from 'react';
import axios from '../axios';

class MainScreen extends Component {
    state = {
        players : ["","","",""],
        id : ""
    }    
    submitPlayers = (event) =>{  
        event.preventDefault();       
        axios
          .post("/screen",{            
            players :[this.refs.player1.value,this.refs.player2.value,this.refs.player3.value,this.refs.player4.value],
            scores : [[0],[0],[0],[0]]               
          })
          .then(data=>{              
              this.setState({id : data.data.infoCreated._id});
              this.props.history.push(`/api/game/${this.state.id}`);            
          })
          .catch(err => console.log(err));
      }

      handleInputChange = (e) =>{
        console.log(e.target.value);
        let players = this.state.players;
        players[e.target.name] = e.target.value;
        this.setState({
          players : players
        })
        
      }
      
    render() {
        return (
            <div className="container">
                <form onSubmit={this.submitPlayers}>
                    <input type="text" onChange={this.handleInputChange} ref="player1" placeholder="Player 1" className="col-sm-12 form-control m-3 w-25" name="1" required />
                    <input type="text" onChange={this.handleInputChange} ref="player2" placeholder="Player 2" className="col-sm-12 form-control m-3 w-25" name="2" required />
                    <input type="text" onChange={this.handleInputChange} ref="player3" placeholder="Player 3" className="col-sm-12 form-control m-3 w-25" name="3" required />
                    <input type="text" onChange={this.handleInputChange} ref="player4" placeholder="Player 4" className="col-sm-12 form-control m-3 w-25" name="4" required />
                    <div>
                        <button type="submit" className="btn btn-danger d-block m-auto m-3" >CREATE NEW GAME</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default MainScreen;