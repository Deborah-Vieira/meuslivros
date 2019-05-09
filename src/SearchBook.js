import React, { Component } from "react";
import { search as buscaLivros } from "./BooksAPI";
import { Link } from "react-router-dom";
import Livros from "./Livros";

class SearchBook extends Component {
  state = {
    query: "",
    resultadoBuscaLivros: []
  };

  //metodo de atualização do campo input
  updateQuery = query => {
    const texto = query.trim();
    this.setState({ query: texto });
    buscaLivros(texto).then(res =>
      this.setState({ resultadoBuscaLivros: res })
    );
  };

  render() {
    let listaLivros = this.state.resultadoBuscaLivros;
    console.log(listaLivros);

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {listaLivros != null ? (
            <Livros books={listaLivros} updateBook={this.props.updateBook} />
          ) : null}
        </div>
      </div>
    );
  }
}
export default SearchBook;
