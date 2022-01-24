import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ConfirmProvider } from 'material-ui-confirm';
import {config} from './Consts.js'
import './App.css';
import Home from './pages/home'
import Edit from './pages/edit'
import DateCheck from './components/DateCheck'
import Session from './components/Session'


function App() {

  return (
    <ConfirmProvider>
      <DateCheck />
      <p>{config.clientId}</p>
      <Session>
        <Router>
          <Switch>
            <Route path="/Add" component={Edit} />
            <Route path="/Edit/:salaryId" component={Edit} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </Session>
    </ConfirmProvider>
  );
}

export default App;
