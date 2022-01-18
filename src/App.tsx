import './App.css';
import Document from './components/Document/Document';
import Landing from './components/Landing/Landing'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include'
  }
});

const App: React.FC = () => (
  <Provider value={client}>
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to='/document' />
        </Route>
        <Route path="/document" exact>
          <Landing />
        </Route>
        <Route path="/document/:id">
          <Document />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
      </Switch>
    </Router>
  </Provider>
);

export default App;
