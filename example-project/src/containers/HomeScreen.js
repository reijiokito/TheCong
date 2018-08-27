import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import axios from '../axios';
import MainContent from '../components/MainContent';


class HomeScreen extends Component {
  state = {
    images: [],
    searchText: ""

  }

  componentDidMount() {
    axios
      .get('/api/images')
      .then(data => {
        this.setState({
          images: data.data.images,
        });
      })
      .catch(err => console.log(err));
  }


  _onsearchChaged = text => this.setState({ searchText: text });

  
  begin = () => { 
    const username = this.props.user.username;
    const allImages =  this.state.images.filter(img => img.description.includes(this.state.searchText));
    const displayImages = this.state.images.filter(img => img.description.includes(this.state.searchText) && img.owner.username === username);
    if(this.props.isLogin!==true){
      return (
        <div>
          <NavBar onsearchChanged={this._onsearchChaged} user={this.props.user} isLogin={this.props.isLogin} isBeginLogin={this.props.isBeginLogin}/>
          <MainContent images={allImages} />
        </div>
      );
    }
    else{
      return (
        <div>
          <NavBar onsearchChanged={this._onsearchChaged} user={this.props.user} isLogin={this.props.isLogin} isBeginLogin={this.props.isBeginLogin}/>
          <MainContent images={displayImages} />
        </div>
      );
    }
      


  }
  render() {
    return (
      <div>
        {this.begin()}
      </div>
    );
  }
}

export default HomeScreen;