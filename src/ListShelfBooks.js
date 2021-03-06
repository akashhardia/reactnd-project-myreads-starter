import React, {Component} from 'react'
import SeparateBook from './SeparateBook.js' 
import {Link} from 'react-router-dom'
import {PropTypes} from 'prop-types'

class ListShelfBooks extends Component{

  static propTypes = {
    shelfBooks: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
  }
  
  render(){
    let books = this.props.shelfBooks;
                      var currentlyReading = books.filter((book) => (book.shelf === "currentlyReading"));
                      var wantToRead=books.filter((book) => (book.shelf === "wantToRead"));
                      var read=books.filter((book) => (book.shelf === "read"))



    return(
    	<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>


                {
                  // Currently Reading
                }                           
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">                      
                        {currentlyReading.length>0 && currentlyReading.map((book, i) => (<SeparateBook book={book} key={i} changeShelf={(shelf) => {
                          this.props.updateBook(shelf,book)
                        }}/>))}
                    </ol>
                  </div>
                </div>
                  

                {
                  // Want to Read
                }
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {wantToRead.length>0 && wantToRead.map((book, i) => (<SeparateBook book={book}  key={i} changeShelf={(shelf) => {
                          this.props.updateBook(shelf,book)
                        }}/>))}
                    </ol>
                  </div>
                </div>


                {
                  // Read
                }
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {read.length>0 && read.map((book, i) => (<SeparateBook book={book} key={i} changeShelf={(shelf) => {
                          this.props.updateBook(shelf,book)
                        }}/>))}             
                    </ol>
                  </div>
                </div>                
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book </Link>
            </div>
          </div>
    	)
	}
}
export default ListShelfBooks