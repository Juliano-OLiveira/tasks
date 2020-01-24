import React, {Component} from 'react';
import './index.css';
import Nav from '../nav/nav';
import Nav2 from '../nav/nav2';




class Header extends Component {
 
  render(){
    return(
      
      <header className="header">

      <h1> {this.props.title} </h1>
     
      <Nav unsfinished={this.props.unsfinished}/>
      <Nav2 finished={this.props.finished}/>
      </header>




    )
  }
}

export default Header;
