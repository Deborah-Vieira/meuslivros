import React from "react";
import * as BooksAPI from "./BooksAPI";
import ConteudoLivro from "./Lendoatualmente/ConteudoLivro";
import WantToRead from "./QueroLer/WantToRead";
import Read from "./Ler/Read";
import SearchBook from "./SearchBook";
import { Link, Route } from "react-router-dom";
import App from "./App.css";

class BooksApp extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [], //os livros estão aqui no estado da minha aplicação
      query: ""
    };

    this.updateBook = this.updateBook.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then(livros => {
      this.setState({ books: livros });
    });
  }

  //método atualiza os livros nas prateleiras guardando o resultado no array shelfs
  updateBook(book, shelf) {
    BooksAPI.update(book, shelf).then(resp => {
      book.shelf = shelf;
      const livrosFiltrados = this.state.books.filter(
        item => item.id !== book.id
      );
      this.setState({
        books: [...livrosFiltrados, book]
      });
    });
  }

  //3 variaveis que passam a lista de livro para os componente respectivos
  render() {
    let LendoatualmenteLivros = this.state.books.filter(
      book => book.shelf === "currentlyReading"
    );
    let Ler = this.state.books.filter(book => book.shelf === "read");
    let QueroLer = this.state.books.filter(book => book.shelf === "wantToRead");

    return (
      <div className="app">
        <Route
          path="/search"
          render={() => <SearchBook updateBook={this.updateBook} />}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>Meuslivros</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <ConteudoLivro
                    books={LendoatualmenteLivros}
                    updateBook={this.updateBook}
                  />

                  <WantToRead books={QueroLer} updateBook={this.updateBook} />
                  <Read books={Ler} updateBook={this.updateBook} />
                  {/* botão que vai para a página de busca */}
                  <Link to="/search">
                    <div className="open-search">Add a book</div>
                  </Link>
                </div>
              </div>
              )}
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
