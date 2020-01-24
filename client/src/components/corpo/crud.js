import React, {Component} from 'react';
import './index.css';

class CRUDs extends Component {
 
  status=()=>{
    
    if (this.props.value.status === true) {
      return <h4>Pendente</h4>
    } else {
      return <h4>Resolvida</h4>
    }
    
  }  
  render(){
   
    return(
      <div className="cot">
      <form className="crud">
      <h1>Sistema acadêmico 2</h1>
     
      <h5> <u className="textcor">Titulo:    </u>    {this.props.value.title}</h5>
      <h5><u className="textcor">Categoria:   </u> {this.props.value.categoria}</h5>
      <h5> <u className="textcor">Descricao:  </u> {this.props.value.textarea}</h5>
      <h5> <u className="textcor">  </u> {this.status()}</h5>
    
      <button type="button" onClick={this.props.editar} className='bt1_editar'>Editar    </button>
      <button type="button" onClick={this.props.delete} className='bt2_excluir'>Exluir </button>
      <button type="button"  onClick={this.props.concluir} className='bt3_concluir'>Concluir </button>

      </form>
      </div>
    )
  }

}


   

export default CRUDs;
