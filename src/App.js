import React from 'react'
import {Route} from 'react-router-dom' 
import './App.css'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import ListShelfBooks from './ListShelfBooks'

class BooksApp extends React.Component {

  state = {
      books :[]                
  }

  componentDidMount(){
    this.fetchBooks(); 
  }

  fetchBooks=()=>{
    BooksAPI.getAll().then((books)=>{
      this.setState({books:books})
    })
  }

  onChangeShelf=(shelf, book)=>{
      BooksAPI.update(book,shelf).then(()=>{
        BooksAPI.getAll().then(books=>this.setState({books: books}))
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render = {()=>(
          <SearchBooks updateBook={this.onChangeShelf} shelfBooks = {this.state.books}/>
        )}/> 


        <Route exact path='/' render={()=>(
          <ListShelfBooks shelfBooks={this.state.books} updateBook={this.onChangeShelf}/>
        
        )}/>
      </div>
    )
  }
}

export default BooksApp