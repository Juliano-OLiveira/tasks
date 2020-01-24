import React, {Component} from 'react';
//import '/root/Documents/testapp/node_modules/flexboxgrid/css/flexboxgrid.min.css';
import './index.css';

class Nav2 extends Component{
  render(){
    return(
      <div className="nav2" >
        <div className="col-xs-8 col-sm-8 col-md-6 col-lg-4">

        {this.props.finished} <br/> resolvidas

       </div>
       </div>
    )
  }

}

export default Nav2
