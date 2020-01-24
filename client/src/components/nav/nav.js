import React, {Component} from 'react';

//import '/root/Documents/testapp/node_modules/flexboxgrid/css/flexboxgrid.min.css';
import './index.css';

class Nav extends Component{

  render(){
    return (
      <div className="nav" >
      <div className="row">
        <div className=" col-xs-1">

        {this.props.unsfinished} <br/> Afazer

</div>
      </div>
        </div>
    )


  }
}







export default Nav;
