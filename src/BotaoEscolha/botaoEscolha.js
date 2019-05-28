import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";

class BotaoEscolha extends Component {


  render() {
    let prateleira = this.props.shelf;
    const { book, updateBook } = this.props; //desconstrução
    return (
      <div className="book-shelf-changer">
        <select value={book.shelf} onChange={e => updateBook(book, e.target.value)}>
          <option value="none" disabled>Move to</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}
export default BotaoEscolha;
