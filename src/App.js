import React from "react";
import * as BooksAPI from "./BooksAPI";
import ConteudoLivro from "./Lendoatualmente/ConteudoLivro";
import WantToRead from "./QueroLer/WantToRead";
import Read from "./Ler/Read";
import App from "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [], //UM ARRAY DE LIVROS
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  };

  componentDidMount() {
    //aqui puxo todos os dados da lista de livros da api, antes que a pagina carregue
    BooksAPI.getAll().then(livros => {
      this.setState({ bookList: livros });
    });
  }
  render() {
    let LendoatualmenteLivros = this.state.books.filter(
      book => book.shelf === "currentlyReading"
    );

    {
      /* preciso criar aqui uma variável para que passe a lista de livros para cada componente */
    }
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
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
        ) : (
          //ESSA DIV RENDERIZA O TITULO DA PÁGINA
          <div className="list-books">
            <div className="list-books-title">
              <h1>Meuslivros</h1>
            </div>

            <div className="list-books-content">
              <div>
                <ConteudoLivro
                  books={this.state.books.filter(
                    book => book.shelf === "currentlyReading"
                  )}
                />
                {/* preciso passar para cada componente a lista de livros aquiRETIREI A SEGUNDA CLASSE bookshelf */}
                <WantToRead
                  books={this.state.books.filter(
                    book => book.shelf === "currentlyReading"
                  )}
                />
                {/* RETIREI A 3 CLASSE bookshelf */}
                <Read
                  books={this.state.books.filter(
                    book => book.shelf === "currentlyReading"
                  )}
                />
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
