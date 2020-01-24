import React, {Component} from 'react';
import './index.css';



class Footer extends Component{

render(){
  return(
    <div className="div2">
    <footer  >
    <button onClick={this.props.onClick}   className="footer" > + </button>

    </footer>
    </div>
  )
}

}

export default Footer;
