import React from "react";
import * as BooksAPI from "./BooksAPI";
import ConteudoLivro from "./Lendoatualmente/ConteudoLivro";
import WantToRead from "./QueroLer/WantToRead";
import Read from "./Ler/Read";
import SearchBook from "./SearchBook";
import { Link, Route } from "react-router-dom";
import App from "./App.css";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";

class BooksApp extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [], //os livros estão aqui no estado da minha aplicação
      query: ""
    };
    //this.searchBook = this.searchBook.bind(this);

    this.updateBook = this.updateBook.bind(this); //identificação de escopo, faz o this trabalhar no retorno de chamada, uso isso caso nao use na minha função o ES6 de seta a arrow function (=>) a seta.
  }

  //aqui puxo todos os dados da lista de livros da api, antes que a pagina carregue
  componentDidMount() {
    BooksAPI.getAll().then(livros => {
      this.setState({ books: livros }); //nome da minha array books aqui estou guardando nela os livros
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

  //na linha 38 : criamos uma  nova array, passamos os items da array livrosFiltrados e também o book com a nova prateleira setada
  // livrosFiltrados é a array sem o livro antigo
  //console.log("teste", book, shelf);

  /** O QUE FALTA É : RENDERIZAR OS LIVROS PASSADOS PARA A ESTANTE ATUAL */

  /*Tudo o que eu fiz no estado anterior acima foi:  quero que o proximo estado se baseie no estado atual
    1  na linha 35 passo o array de livros e faço um filtro eliminando da tela o que for diferente da estante.
    2 o filter nao retorna uma array, ele faz o que eu quero nesse caso o que for diferente vai ser eliminado os ids de estante e livro, e retorna uma nova lista atualizada
  
    * */

  /*BooksAPI.update().then(data => {
      this.setState({ shelfs: data });
    });*/

  //3 variaveis que passam a lista de livro para os componente respectivos
  render() {
    //console.log(this.state.books); //acessando o estado do componente
    let LendoatualmenteLivros = this.state.books.filter(
      book => book.shelf === "currentlyReading"
    );
    let Ler = this.state.books.filter(book => book.shelf === "read");
    let QueroLer = this.state.books.filter(book => book.shelf === "wantToRead");

    return (
      //esse route renderiza a pagina de busca
      <div className="app">
        <Route path="/search" component={SearchBook} />
        {/*ESSA DIV RENDERIZA O TITULO DA PÁGINA e na 63 passo as variaveis do filter para componentes*/}
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
