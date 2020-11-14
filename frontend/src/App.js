import './App.css';
import { Route, Switch } from 'react-router-dom';

import Movies from './components/Movies';
import Navbar from './components/Navbar';
import Customers from './components/Customers';
import Rentals from './components/Rentals';

function App() {
  return (
    <div className="App">
      <Navbar />
     
      <Switch>
        <Route path="/customers" component={Customers} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/" exact component={Movies} />
      </Switch>
    </div>
  );
}

export default App;
