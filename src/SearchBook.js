import React, { Component } from "react";
import { Link } from "react-router-dom";

//AQUI VOU COLOCAR TODO O QUE FOR PERTINENTE A PÁGINA DE BUSCA

class SearchBook extends Component {
  /* state = {
    query: ""
  };

  //metodo de atualização do campo input
  updateQuery = query => {
    this.state.query({ query: query.trim() }); //eliminando espaços em branco com o trim
  };*/

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          {/* ja temos o campo de input com o valor */}
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.setState.query} //quero que o valor seja sempre o do estado a query
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid" />
        </div>
      </div>
    );
  }
}
export default SearchBook;
