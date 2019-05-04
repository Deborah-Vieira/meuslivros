import React, { Component } from "react";
import { search as buscaLivros } from "./BooksAPI";
import { Link } from "react-router-dom";
import Livros from "./Livros";
import { DebounceInput } from "react-debounce-input";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";

//AQUI VOU COLOCAR TODO O QUE FOR PERTINENTE A PÁGINA DE BUSCA

class SearchBook extends Component {
  state = {
    query: "",
    resultadoBuscaLivros: []
  };

  /*método troca de estante
  searchBook(query) {
    BooksAPI.search(query).then(livros => {
      this.setState({ books: livros });
      //console.log("busca", livros);
    });
  }*/

  //metodo de atualização do campo input
  //passando um paramentro query
  updateQuery = query => {
    const texto = query.trim(); //guarda na variavel o que digito,o texto e o trim é para nao apagar o q digito
    this.setState({ query: texto });
    buscaLivros(texto).then(
      res => this.setState({ resultadoBuscaLivros: res }) //guardei a resposta de array de livros em resultado
    ); //mostra o resultado dos livros quando digito no console
  };

  render() {
    let listaLivros = this.state.resultadoBuscaLivros;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              minLength={2}
              debounceTimeout={300}
              type="text"
              onChange={event => this.updateQuery(event.target.value)}
              placeholder="Search by title or author"
              value={this.setState.query} //quero que o valor seja sempre o do estado a query
            />
          </div>
        </div>
        <div className="search-books-results">
          <Livros books={listaLivros} />
          <ol className="books-grid" />
        </div>
      </div>
    );
  }
}
export default SearchBook;

/**<input
              type="text"
              placeholder="Search by title or author"
              value={this.setState.query} //quero que o valor seja sempre o do estado a query
              onChange={event => this.updateQuery(event.target.value)}
            /> */
