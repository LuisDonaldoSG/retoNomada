import './App.css';
import DragAndDrop from './components/DragAndDrop';
import InfoActor from './components/InfoActor';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (

    <Router>
      <Switch>
        <Route path = "/" exact >
          <DragAndDrop />
        </Route>
        <Route path = "/info" >
          <InfoActor/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

