import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ConfirmProvider } from 'material-ui-confirm';
import logo from './logo.svg';
import './App.css';
import Home from './pages/home'
import Edit from './pages/edit'


function App() {

  return (
    <ConfirmProvider>
      <Router>
        <Switch>
          <Route path="/Add" component={Edit} />
          <Route path="/Edit" component={Edit} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </ConfirmProvider>
  );
}

export default App;
