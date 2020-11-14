import React, {Component} from 'react';
import Pagination from './commons/pagination';
import ListGroup from './commons/ListGroup';
import { getMovies } from './../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage:1,
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({selectedGenre: genre, currentPage: 1})
  }

  showData = () => {
    console.log(this.state.movies)
    this.setState(this.state.movies)
  }

  render() {
    const { length: count } = this.state.movies;
    const {pageSize, currentPage, movies: allMovies, selectedGenre} = this.state;
  
    if(count === 0) return <p>Sem filmes disponíveis.</p>

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
            <h4 className="text-light mb-5">
              Showing {filtered.length} movies.
            </h4>
            <div className="row text-center text-lg-left">
              {movies.map((movie) => (
                <div key={movie._id} className="col-lg-3 col-md-4 col-sm-12">
                  <div className="card">
                    <div className="movie-card">
                      <img className="card-img-top" src={movie.img} alt="Card" />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text">{movie.genre.name}</p>
                      <a href="/" className="btn btn-primary">
                        Go somewhere
                      </a>
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
