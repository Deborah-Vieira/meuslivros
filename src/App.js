import React from "react";
import * as BooksAPI from "./BooksAPI";
import ConteudoLivro from "./Lendoatualmente/ConteudoLivro";
import WantToRead from "./QueroLer/WantToRead";
import Read from "./Ler/Read";
import App from "./App.css";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";

class BooksApp extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      books: [],
      query: "", //UM ARRAY DE LIVROS
      showSearchPage: [], //guarda a busca dos livros
      showSearchPage: false
    };
    //this.updateBook = this.updateBook.bind(this); //identificação de escopo, faz o this trabalhar no retorno de chamada, uso isso caso nao use na minha função o ES6 de seta a arrow function (=>) a seta.
  }

  //aqui puxo todos os dados da lista de livros da api, antes que a pagina carregue
  componentDidMount() {
    BooksAPI.getAll().then(livros => {
      this.setState({ books: livros }); //nome da minha array books aqui estou guardando nela os livros
    });
  }

  /* /método atualiza os livros nas prateleiras
  updateBook(book, shelf) {
    BooksAPI.update().then(livros => {
      this.setState({});
    });
  }*/

  //método busca
  /* searchBook(query) {
    BooksAPI.search(query).then(livros => {
      this.setState({ booksSearch: livros });
      //console.log("busca", livros);
    });
}*/
  updateQuery = query => {
    this.setState({ query: query.trim() });
  };

  //3 variaveis que passam a lista de livro para os componente respectivos
  render() {
    //Buscando contatos segundo expressoes regulares
    let MostraLivros;
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), "i");
      MostraLivros = this.props.livros.filter(livros => match.test(book.name));
    } else {
      MostraLivros = this.props.livros;
    }

    //console.log(this.state.books); //acessando o estado do componente
    let LendoatualmenteLivros = this.state.books.filter(
      book => book.shelf === "currentlyReading"
    );
    let Ler = this.state.books.filter(book => book.shelf === "read");
    let QueroLer = this.state.books.filter(book => book.shelf === "wantToRead");
    return (
      //essa div é referente a página de busca , caso eu queira a componentizar
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={this.setState.query}
                  onChange={event => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
        ) : (
          //ESSA DIV RENDERIZA O TITULO DA PÁGINA e na 63 passo as variaveis do filter para componentes
          <div className="list-books">
            <div className="list-books-title">
              <h1>Meuslivros</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ConteudoLivro books={LendoatualmenteLivros} />
                <WantToRead books={QueroLer} />
                <Read books={Ler} />
                <div className="open-search">
                  <button
                    onClick={() => this.setState({ showSearchPage: true })}
                  >
                    Add a book
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
