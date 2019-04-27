import React from "react";
import * as BooksAPI from "./BooksAPI";
import ConteudoLivro from "./Lendoatualmente/ConteudoLivro";
import WantToRead from "./QueroLer/WantToRead";
import Read from "./Ler/Read";
import App from "./App.css";

class BooksApp extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [], //UM ARRAY DE LIVROS
      showSearchPage: false
    };
    this.updateBook = this.updateBook.bind(this); //identificação de escopo, faz o this trabalhar no retorno de chamada
  }

  //aqui puxo todos os dados da lista de livros da api, antes que a pagina carregue
  componentDidMount() {
    BooksAPI.getAll().then(livros => {
      this.setState({ books: livros }); //nome da minha array books aqui estou guardando nela os livros
    });
  }

  /*/método atualiza os livros nas prateleiras
  updateBook(book, shelf) {
    BooksAPI.update().then(livros => {
      this.setState({});
    });
  }

  //método busca
  /*  searchBook(query) {
    BooksAPI.query().then(query => {
      this.setState({});
    });
  }*/

  //3 variaveis que passam a lista de livro para os componente respectivos
  render() {
    //console.log(this.state.books); //acessando o estado do componente
    let LendoatualmenteLivros = this.state.books.filter(
      book => book.shelf === "currentlyReading"
    );
    let Ler = this.state.books.filter(book => book.shelf === "read");
    let QueroLer = this.state.books.filter(book => book.shelf === "wantToRead");
    return (
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
                <input type="text" placeholder="Search by title or author" />
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
