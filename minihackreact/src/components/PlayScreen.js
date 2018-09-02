import React, { Component } from 'react';
import axios from '../axios';
import { Table, Button } from 'reactstrap'
class PlayScreen extends Component {
    state = {
        info: null,
        totalScore: 0
    }

    componentDidMount() {
        const infoId = this.props.match.params.infoId;
        axios
            .get(`/api/game/${infoId}`)
            .then(data => {
                if (data.data.info && data.data.info._id) {
                    const info = data.data.info;
                    const totalScore = info.scores.map(playerScore => {
                        return playerScore.reduce((total, item) => {
                            return total + item;
                        }, 0)
                    })
                    this.setState({ info, totalScore });

                }
            })
            .catch(err => console.log(err));

    }


    renderPlayerName = (players) => {
        return players.map((player, index) => <th key={index}>{player}</th>)
    }

    renderPlayerTotalScore = () => {
        const { totalScore } = this.state
        const sumOfScore = totalScore.reduce((total, item) => {
            return total + item;
        }, 0);
        const totalScorePlayer = totalScore.map((score, index) => <th key={index}>{score}</th>);
        return (
            <tr>
                <td>Sum of Score ({sumOfScore})</td>
                {totalScorePlayer}
            </tr>
        );
    }

    

    renderPlayRow = (scores) => {
        let rows = [];
        scores.forEach((playerScore, playerIndex) => {
            playerScore.forEach((score, rowIndex) => {
                if (rows[rowIndex])
                    rows[rowIndex][playerIndex] = score;
                else {
                    rows[rowIndex] = [];
                    rows[rowIndex][playerIndex] = score;
                }
            });
        });

        return rows.map((row, index1) => {
            let rowData = row.map((score, index2) => <td key={index2}><input type="Number" value={Number(score)} name={`${index1},${index2}`} onChange={this.handleInputChange} /></td>)
            return (
                <tr key={index1}>
                    <th>{index1 + 1}</th>
                    {rowData}
                </tr>
            );
        })
    }

    handleAddRow = () => {
        const sumScore = this.state.totalScore.reduce((total,item) =>{
            return total + item;
        });    
        if(sumScore !== 0){
            alert('Wrong value!!!!');
        }
        else{
            let { info } = this.state;
            info.scores = info.scores.map((score, index) => {
                score.push(0);
                return score;
            });
            this.setState({ info });
        }
    }

    handleInputChange = (e) => {
        const value = e.target.name;
        var arr = value.split(",");
        arr = arr.map(value => Number(value));
        let info = this.state.info;
        info.scores[arr[1]][arr[0]] = Number(e.target.value);


        var newScore = 0;
        info.scores.forEach((playerScore,index1) =>{            
            if(index1===arr[1]){
                newScore +=  playerScore.reduce((total,item) =>{
                    return total + item;
                },0);
            }
        });        
        const { totalScore } = this.state;
        totalScore[arr[1]] =  newScore;


        this.setState({ info,totalScore });
        //Save to server    
        axios
            .put(`/api/game/${this.state.info._id}`, {
                players: this.state.info.players,
                scores: this.state.info.scores
            })
            .then(data => {
                console.log(data);
            })
            .catch(err => console.log(err));

    }

    shouldComponentUpdate(props, states) {
        return true;
    }

    render() {
        const { info } = this.state;
        const { players, scores } = info || {};
        if (info && players && scores) {
            return (
                <div>
                    <Table striped>
                        <thead>
                            <tr>
                                <th></th>
                                {this.renderPlayerName(players)}
                            </tr>
                            {this.renderPlayerTotalScore()}
                        </thead>
                        <tbody>
                            {this.renderPlayRow(scores)}
                        </tbody>

                    </Table>
                    <div className="text-center ">
                        <Button className="btn-danger" onClick={this.handleAddRow}>Add row
                        </Button>
                    </div>
                </div>
            );
        }
        else return "LOading......";
    }
}
export default PlayScreen;

// state = {
//     info: {},
//     values: []

// }

// newFunction(){
//     axios
//       .get(`/api/game/playscreen`)
//       .then(data=>{
//           const info = data.data.infoFound;
//           console.log(info);
//       })
//       .catch(err => console.log(err));
// }


// handleInputChange = (e) => {

//     let values = this.state.values;
//     values[e.target.name] = e.target.value;
//     this.setState({
//         values
//     })
//     const arr = this.state.values.map(value => Number(value));
//     if (e.target.name === "0")
//         document.getElementById('score1').innerText = arr[e.target.name];
//     if (e.target.name === "1")
//         document.getElementById('score2').innerText = arr[e.target.name];
//     if (e.target.name === "2")
//         document.getElementById('score3').innerText = arr[e.target.name];
//     if (e.target.name === "3")
//         document.getElementById('score4').innerText = arr[e.target.name];
// }
// shouldComponentUpdate(nextProps, nextState) {
//     return true;
// }

// componentDidUpdate() {
//     axios
//         .put(`/api/game/${this.props.match.params.infoId}`, {
//             p1: this.props.info.p1,
//             p2: this.props.info.p2,
//             p3: this.props.info.p3,
//             p4: this.props.info.p4,
//             s1: this.state.values[0],
//             s2: this.state.values[1],
//             s3: this.state.values[2],
//             s4: this.state.values[3]
//         })
//         .then(data => {
//             console.log(data);
//         })
//         .catch(err => console.log(err));
// }

// render() {


//     return (
//         <div className="text-danger container">
//             <h3> Play Screen </h3>
//             <hr />
//             <table className="table table-hover table-dark">
//                 <thead>
//                     <tr>
//                         <th scope="col"></th>
//                         <th scope="col" ref="p1" >{this.props.info.p1}</th>
//                         <th scope="col" ref="p2" >{this.props.info.p2}</th>
//                         <th scope="col" ref="p3">{this.props.info.p3}</th>
//                         <th scope="col" ref="p4">{this.props.info.p4}</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <th scope="row">Sum of Score</th>
//                         <td id="score1" ref="s1">{this.props.info.s1}</td>
//                         <td id="score2" ref="s2">{this.props.info.s2}</td>
//                         <td id="score3" ref="s3">{this.props.info.s3}</td>
//                         <td id="score4" ref="s4">{this.props.info.s4}</td>
//                     </tr>
//                     <tr>
//                         <th scope="row">Round</th>
//                         <td><input onChange={this.handleInputChange} className="form-control" name="0" required /></td>
//                         <td><input onChange={this.handleInputChange} className="form-control" name="1" required /></td>
//                         <td><input onChange={this.handleInputChange} className="form-control" name="2" required /></td>
//                         <td><input onChange={this.handleInputChange} className="form-control" name="3" required /></td>
//                     </tr>
//                 </tbody>

//             </table>
//             <div className="text-center">
//                 <button className="btn btn-danger" onClick={this.calValues}>
//                     Add New Row
//                 </button>
//             </div>
//         </div>
//     );
// }
// }