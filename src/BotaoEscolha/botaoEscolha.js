import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";

class BotaoEscolha extends Component {
  //metodo troca de prateleira, puxando do metodo de app.js, e da api a atualização
  /* changeShelf = event => {
    console.log(event.target.value);
    BooksAPI.update(this.props.books, event.target.value).then(data => {
      console.log(data);
    });
  };*/

  render() {
    let prateleira = this.props.shelf;
    const { book, updateBook } = this.props; //desconstrução
    return (
      <div className="book-shelf-changer">
        <select onChange={e => updateBook(book, e.target.value)}>
          <option value="move" disabled>
            {" "}
            Move to
          </option>
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
