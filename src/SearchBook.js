import React, { Component } from "react";
import { search as buscaLivros } from "./BooksAPI";
import { Link } from "react-router-dom";
import Livros from "./Livros";
//import { DebounceInput } from "react-debounce-input";

//AQUI VOU COLOCAR TODO O QUE FOR PERTINENTE A PÁGINA DE BUSCA

class SearchBook extends Component {
  state = {
    query: "",
    resultadoBuscaLivros: []
  };

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
              value={this.state.query} //quero que o valor seja sempre o do estado a query
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {listaLivros != null ? <Livros books={listaLivros} /> : null}
        </div>
      </div>
    );
  }
}
export default SearchBook;
