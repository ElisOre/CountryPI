import "./App.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./vistas/Home/Home";
import CreateActivity from "./vistas/CreateActivity/CreateActivity";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route path="/activity" component={CreateActivity} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
