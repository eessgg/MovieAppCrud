import React, {Component} from 'react';
import { NavLink , Link} from "react-router-dom";
import Pagination from './commons/pagination';
import ListGroup from './commons/ListGroup';
import { getMovies } from './../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';
import _ from 'lodash';
import SearchBox from './SearchBox';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: {path: "title", order: "asc"}
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery:"", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies, 
    } = this.state;

    let filtered = allMovies;
    if(searchQuery)
      filtered = allMovies.filter(m => 
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    else if(selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return {totalCount: filtered.length, data: movies};
  }

  showData = () => {
    console.log(this.state.movies);
    this.setState(this.state.movies);
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      searchQuery,
    } = this.state;

    if (count === 0) return <p>Sem filmes disponíveis.</p>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="container">
        <div className="jumbotron bg-transparent">
          <h1 className="display-4 text-light m-5">
            Watch your favorite movies
          </h1>
          <NavLink to="/movieform" className="btn btn-warning btn-lg">
            New Movie
          </NavLink>
        </div>
        <div className="row mb-5">
          <div className="col-12" style={{ color: "red" }}>
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p className="text-light mb-5">
              Showing {filtered.length} movies.
            </p>
            <h3>Encontre o seu filme.</h3>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />

            <div className="row text-center text-lg-left">
              {movies.map((movie) => (
                <div key={movie._id} className="col-lg-3 col-md-4 col-sm-12">
                  <div className="card">
                    <div className="movie-card">
                      <img
                        className="card-img-top"
                        src={movie.img}
                        alt="Card"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        {movie.title} <i className="fas fa-star"></i>
                      </h5>
                      <p className="card-text">{movie.genre.name}</p>
                      <Link to={`/movies/${movie._id}`}>Ver Detalhes</Link>
                      <button className="btn btn-danger">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              itemsCount={filtered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}


export default Movies;
