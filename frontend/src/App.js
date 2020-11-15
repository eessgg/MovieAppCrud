import './App.css';
import { Route, Switch } from 'react-router-dom';

import Movies from './components/Movies';
import Navbar from './components/Navbar';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import MovieDetails from './components/MovieDetails';
import Login from './components/Login';
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/customers" component={Customers} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/movies/:id" component={MovieDetails} />
        <Route path="/" exact component={Movies} />
      </Switch>
    </div>
  );
}

export default App;
