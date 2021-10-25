import './App.css';
import TextEditor from './components/TextEditor/TextEditor'
import Landing from './components/Landing/Landing'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Landing />
          {/* <Redirect to={`/documents/${uuidv4()}`} /> */}
        </Route>
        <Route path="/document/:id">
          <TextEditor />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
