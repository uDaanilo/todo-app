import React from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends React.Component {
   constructor(props){
      super(props)

      this.state = {
         description: '',
         list: []
      }

      this.handleAdd = this.handleAdd.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleSearch = this.handleSearch.bind(this)
      this.handleRemove = this.handleRemove.bind(this)
      this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
      this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
      this.handleClear = this.handleClear.bind(this)

      this.refresh()
   }

   refresh(description = ''){
      const searchQuery = description ? `&description__regex=/${description}/` : ''
      axios(`${URL}?sort=-createdAt${searchQuery}`)
         .then(res => this.setState({...this.state, description, list: res.data}))
   }

   handleAdd(){
      const description = this.state.description
      axios.post(URL, {description})
         .then(() => this.refresh())
   }

   handleChange(e){
      this.setState({ ...this.state, description: e.target.value })
   }

   handleSearch(){
      this.refresh(this.state.description)
   }

   handleRemove(item){
      axios.delete(`${URL}/${item._id}`)
         .then(() => this.refresh(this.state.description))
   }

   handleMarkAsDone(item){
      axios.put(`${URL}/${item._id}`, { ...item, done: true })
         .then(() => this.refresh(this.state.description))
   }

   handleMarkAsPending(item){
      axios.put(`${URL}/${item._id}`, { ...item, done: false })
         .then(() => this.refresh(this.state.description))
   }

   handleClear(){
      this.refresh()
   }

   render(){
      return (
         <div>
            <PageHeader name="Tarefas" small="Cadastro" />
            <TodoForm description={this.state.description} 
               handleAdd={this.handleAdd} 
               handleChange={this.handleChange} 
               handleSearch={this.handleSearch}
               handleClear={this.handleClear}/>
            <TodoList list={this.state.list} 
               handleRemove={this.handleRemove}
               handleMarkAsDone={this.handleMarkAsDone}
               handleMarkAsPending={this.handleMarkAsPending}/>
         </div>
      )
   }
}