import React from 'react'
import {Route} from 'react-router-dom' 
import './App.css'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import ListShelfBooks from './ListShelfBooks'

class BooksApp extends React.Component {

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books :[]                
  }

  componentDidMount(){
    this.fetchBooks(); 
  }

  fetchBooks()=>{
    BooksAPI.getAll.then((books)=>{
      this.setState({Books:books})
    })
  }

  onChangeShelf=(shelf, book)=>{
      BooksAPI.update(book,shelf).then(()=>{
        BooksAPI.getAll().then(res=>this.setState({books: data}))
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render = {()=>(
          <SearchBooks updateBook={this.onChangeShelf} shelfBooks = {this.state.books}/>
        )}/> 


        <Route exact path='/' render={()=>(
          <ListShelfBooks books={this.books} updateBook={this.onChangeShelf)/>
        
        )}/>
      </div>
    )
  }
}

export default BooksApp