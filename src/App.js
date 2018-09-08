import React, { Component } from 'react';
import $ from 'jquery';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';
import Todos from './Components/Todos';
import uuid from 'uuid';
//import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			projects:[],
			todos:[]	
			
			
		}
		this.handleDeleteProject=this.handleDeleteProject.bind(this);
		this.handleAddProject=this.handleAddProject.bind(this)
	}
	
  getTodos() {
	  //api request
	    $.ajax({
			url:'https://jsonplaceholder.typicode.com/todos',
			dataType:'json',
			cache:false,
			success: function(data) {
				this.setState({todos: data},()=>{
					console.log(this.state);
				});
			}.bind(this),
			error: function( xhr , status , err) { 
				console.log(err);
		}
		});
  }	

  getProjects(){
	  this.setState({projects: [
		   {
					id:uuid.v4(),
					title:"Business Website",
					category: "Web Design"
				},
				{
					id:uuid.v4(),
					title: "Social App",
					category: "Mobile Development"
				},
				{
					id:uuid.v4(),
					title: "Ecommerce Shopping Cart",
					category: "Web Development"
				}
	   ]});
  }
  //lifecycle methods
   componentWillMount() {
	   this.getProjects();
	   this.getTodos();
   }	
   
   componentDidMount() {
	   	   this.getTodos();
   }
   
   handleAddProject(project) {
	   let projects= this.state.projects;
	   projects.push(project);
	   this.setState({projects:projects})
   }
   
  handleDeleteProject(id) {
	  let projects = this.state.projects;
	  let index= projects.findIndex(x => x.id === id);
	  projects.splice(index,1);
	  this.setState({projects:projects})
  } 
   	
  render() {
    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject} />
		<Projects projects={this.state.projects} onDelete={this.handleDeleteProject} />
		<hr />
		<Todos todos={this.state.todos}/>
      </div>
    );
  }
}

export default App;
