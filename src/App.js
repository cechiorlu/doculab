import './App.css';
import Document from './components/Document/Document';
import Landing from './components/Landing/Landing'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

function App() {
  return (
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
      </Switch>
    </Router>
  );
}

export default App;
