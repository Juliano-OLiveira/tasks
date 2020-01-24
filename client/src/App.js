import React, { Component } from 'react';
import Header from './components/header';

import CRUDs from './components/corpo/crud.js';
import Footer from './components/footer/footer.js';
import './components/footer/index.css';

import './App.css';
import '../node_modules/flexboxgrid/css/flexboxgrid.min.css';
import Modal from 'react-modal';
import Axios from 'axios';
import Configs from './config';



class App extends Component {
  constructor(props) {
    super(props);
    

    this.state = {
      unsfinished: 0,
      finished: 0,
      taskAtrr: '',
      resolvida: props.value,
      modalIsOpen: false,
      tasks: [],

    }

    this.unsfinished();
    this.finished();




  }



  async componentDidMount() {
    // fetch('http://localhost:3000/tasks')
    // .then(res => res.json())
    // .then(result => {
    //   this.setState({tasks: result})
    // })
    // ,error => console.log(error)
    // Axios.get(Configs.urlToServer)
    // .then(response =>{
    //   this.setState({tasks: response.data})
    // })
    // .catch(error =>{
    //   console.log(error);
    // })

    let response = await Axios.get(Configs.urlToServer);
    this.setState({ tasks: response.data })
  }
  saveTask(event) {
    event.preventDefault();
    console.log(event);
    let position = event.target.position.value;
    let id = event.target._id.value;

    if (position !== '-1') {
      this.updateTask(id, position, event)
    } else {

      this.createCruds(event);
    }



  }



  updateTask(id, position, event) {
    console.log(event);


    let newtask = {
      _id: id,
      title: event.target.title.value,
      categoria: event.target.categoria.value,
      textarea: event.target.textarea.value,
      descricao: event.target.descricao.value,
      status: false

    }


    console.log(newtask);
    Axios.put(Configs.urlToServer, { task: newtask });
    event.preventDefault();
    let dados = [...this.state.tasks];
    dados[position] = this.newCruds(event);
    this.setState({ tasks: dados });


    this.closeModal();

  }

  


  newCruds(event) {
    let crud = {

      title: event.target.title.value,
      categoria: event.target.categoria.value,
      textarea: event.target.textarea.value,
      descricao: event.target.descricao.value,
      
      status: true
    }
    return crud;
  }

  async unsfinished() {
    let a = await this.counterTask(true);
    console.log(a);
    this.setState({ unsfinished: a });

  }
  async finished() {
    let a = await this.counterTask(false);
    this.setState({ finished: a })
  }

  async counterTask(type = true) {
    let counter = await Axios.get(Configs.urlToServer + '/counter?type=' + type);
    return counter.data;
  }


  createCruds = (event) => {
    event.preventDefault();
    this.status();

    let cruds = [...this.state.tasks];


    Axios.post(Configs.urlToServer, { task: this.newCruds(event) })
      .then(response => {
        cruds.push(response.data);


        this.setState({ tasks: cruds });
        this.closeModal();
        console.log(response);
        this.unsfinished();

      })
      .catch(error => {
        console.log(error);
      })



    this.finished();


    this.closeModal();

  }


  delete = (index) => {

    let task = this.state.tasks;


    Axios.delete(Configs.urlDeletar, { index })
      .then(response => {

        task.splice(index, 1);
        this.setState({ task: task });
        console.log(response);
        this.unsfinished();
        this.finished();


      })

  }

  editar = (tarefa) => {

    this.setState({ taskAtrr: tarefa });
    this.setState({ modalIsOpen: true });


    // console.log("Editando");
  }

  concluir(tarefa, event) {
   
    event.preventDefault();
    let tasks = this.state.tasks;
    let position = tasks.indexOf(tarefa);
   
    let Resolvidas = {
      _id: tarefa._id,
      title: tarefa.title,
      textarea: tarefa.textarea,
      categoria: tarefa.categoria,
      descricao: tarefa.descricao,
      status: false
    }

    Axios.put(Configs.urlToServer, { task: Resolvidas })
      .then(response => {

        tasks[position] = Resolvidas;
        
        this.setState({ tasks: tasks });
      
        this.finished();
        this.unsfinished();



        console.log(response);


      })
      .catch(error => {
        console.log(error);
      })
  
  }




  openModal = () => {

    this.setState({ modalIsOpen: true });

  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';


  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {

    return (

      <div className="App">

        <Header title="Gerencidor de Apps"
          unsfinished={this.state.unsfinished}
          finished={this.state.finished}

        />


        <div className="CRUDs row"  >
          {this.state.tasks.map((tarefa, index) => {

            return < CRUDs 

              key={index}
              value={tarefa}
              className="col-xs-12 col-sm-8 col-md-6 col-lg-4"
              delete={this.delete.bind(this, index)}
              editar={this.editar.bind(this, tarefa)}
              concluir={this.concluir.bind(this, tarefa)}
              
            />




          })}

        </div>

        <Footer onClick={this.openModal} ></Footer>


        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModtabelasal}
          onRequestClose={this.closeModal}
          className="Modal"


          contentLabel="Example Modal"


        >
          <div>
            <button onClick={this.closeModal} className="close" > x </button>

            <h2 ref={subtitle => this.subtitle = subtitle}>Adicionar Tarefas</h2>
          </div>

          <form onSubmit={this.saveTask.bind(this)}  >
            <div>


              <label htmlFor="title">Titulo</label>
              <input type="text" id="title" name="title" ref="title" defaultValue={this.state.taskAtrr.title} placeholder="Titulo.." />
            </div>
            <div>
              <label htmlFor="categoria">Categoria</label>
              <input type="text" id="lname" name="categoria" defaultValue={this.state.taskAtrr.categoria} placeholder="Categoria.." />
            </div>
            <div>
              <label htmlFor="descricao">Descrição</label>
              <textarea name="textarea" rows="10" cols="94" id="descricao" defaultValue={this.state.taskAtrr.descricao} className="textarea" ></textarea>

              <input type="hidden" name="position" defaultValue={this.state.tasks.indexOf(this.state.taskAtrr)} />
              <input type="hidden" name="_id" defaultValue={(this.state.taskAtrr._id)} />
              
              <input type="submit" value="Enviar" name="bt" />
            </div>
          </form>



        </Modal>

      </div>

    );


  }
}



export default App;
