import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import Home from "./pages/Home";
import Error from "./pages/Error";
import CreerQuiz from "./pages/CreerQuiz";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login"

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {connected: false};
  }

  checkConnexion(connected) {
    if (connected !== this.state.connected) this.setState({connected: connected})
  }

  render() {
    return (
        <BrowserRouter>
          <div>
            <header className="header">
              <Navbar connected={this.state.connected}/>
            </header>
            <main role="main">
              <Switch>
                <Route exact={true} path='/' component={Home}/>
                <Route exact={true} path="/jouer/:quiz" component={Quiz}/>
                <Route exact={true} path='/creer/quiz' component={CreerQuiz}/>
                <Route exact={true} path="/connexion"
                       render={props => <Login {...props} checkConnexion={b => this.checkConnexion(b)}/>}/>
                <Route exact={true} path="/admin"
                       render={props => <Login {...props} checkConnexion={b => this.checkConnexion(b)}/>}/>
                <Route path="*" component={Error}/>
              </Switch>
            </main>
            <Footer/>
          </div>
        </BrowserRouter>
    );
  }
}
export default App;
