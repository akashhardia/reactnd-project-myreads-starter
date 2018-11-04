import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import SeparateBook from './SeparateBook'


// Todo: Separate component for SearchBooks

class SearchBooks extends Component{

  static propTypes = {
    updateBook: PropTypes.func.isRequired,
    shelfBooks: PropTypes.array.isRequired  
  }

  state = {
    query: "",
    foundBooks: []
  }

  showResults = (query)=>{
    // search only if query exists
    this.setState({query: query.trim()})
    this.state.query.length>0 && BooksAPI.search(query.trim()).then(books =>{
      if(books.length>0){
        var shelfBooks = this.props.shelfBooks
        for (let book of books) {
          book.shelf = "none"
        }

        for (let book of books) {
          for (let temp of shelfBooks) {
            if (temp.id === book.id) {
              book.shelf = temp.shelf
            }
          }
        }
      }

      // changing foundbooks in state to books
      this.setState({foundBooks: books})
    })
  }

  
  render(){

    return(
      <div className="search-books">

            
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" value={this.state.query} onChange={(event)=>this.showResults(event.target.value)} placeholder="Search by title or author"/>

              </div>
            </div>
            
            
            <div className="search-books-results">
              
                <ol className="books-grid">
                            {//calling seperate child component for each book
                            }
                    {this.state.query.length > 0 && this.state.foundBooks.map((book, index) => (<SeparateBook book={book} key={index} changeShelf={(shelf) => {this.props.updateBook(shelf,book)
                    }}/>))}
                </ol>              
            </div>  

      </div>
      )
  }
}

export default SearchBooks;