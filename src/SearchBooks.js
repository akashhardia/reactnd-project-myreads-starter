import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


// Todo: Separate component for SearchBooks

class SearchBooks extends Component{

  state = {
    query: "",
    foundBooks: []
  }

  showResults = (query)=>{
    this.setState({query: query.trim()})
    BooksAPI.search(query.trim()).then(books =>{
      this.setState({foundBooks: books})
    })
  }

  render(){

    return(
      <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" onChange={(event)=>this.showResults(event.target.value)} placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              
                <ol className="books-grid">
                  {this.state.foundBooks.length>0 && console.log(this.state.foundBooks[0].imageLinks.thumbnail)}
                  {this.state.foundBooks.length>0 && this.state.foundBooks.map(item => (
                    <li>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${item.imageLinks.thumbnail})`}}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{item.title}</div>
                          <div className="book-authors">{item.authors}</div>
                        </div>
                      </li>
      

                  ))
                  }
                </ol>
              
            </div>
          </div>
      )
  }
}

export default SearchBooks;