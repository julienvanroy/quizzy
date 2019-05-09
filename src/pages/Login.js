import React from 'react';
import axios from "axios";
import { Route, Link } from 'react-router-dom';

import {HTTP_SERVER_PORT} from "../constants";
import Buble from "../components/Buble";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.checkConnexion = () => console.log("no connexion");
        if (this.props.checkConnexion) {
            this.checkConnexion = this.props.checkConnexion
        }
        this.state = {
            user: Login.getUser(),
            authenticated: false
        };
        this.login();
    }
    logout() {
        sessionStorage.clear();
        this.setState({
            user: Login.getUser(),
            authenticated: false,
        });
        this.checkConnexion(false);
    };
    login() {
        if (this.state.user) {
            axios.post(HTTP_SERVER_PORT + 'login', this.state.user)
                .then(res => {
                    if (res.data.isConnected) {
                        this.setUser(this.state.user);
                        this.setState({authenticated: true});
                        this.checkConnexion(true);
                    }
                })
        }
    };

    signUp() {
        axios.post(HTTP_SERVER_PORT + 'signUp', this.state.user)
            .then(res => {
                if (res.data.isConnected) this.login()
            });
    };

    setUser() {
        sessionStorage.setItem('username', this.state.user.username);
        sessionStorage.setItem('password', this.state.user.password);
    };

    // --- static methods ---
    static getUser() {
        if (sessionStorage.getItem('username') && sessionStorage.getItem('password')) {
            return ({
                username: sessionStorage.getItem('username'),
                password: sessionStorage.getItem('password')
            })
        }
        return null;
    };

    // --- form methods
    handleForm(e) {
        e.preventDefault();
        this.login();
    };

    setUsername(e) {
        const user = this.state.user || {};
        user.username = e.target.value;
        this.setState({user:user})
    }

    setPassword(e) {
        const user = this.state.user || {};
        user.password = e.target.value;
        this.setState(user)
    }

    render() {
        if (this.state.user && this.state.authenticated) {
            return (
                <div className="container">
                    <Buble/>
                    <div className="content">
                        <p>{this.state.user.username}</p>
                        <Link className="btn" to="/creer/quiz">Creer quizz</Link>
                        <button type="button" name="logout" className="btn btn-secondary"
                                onClick={() => this.logout()}>logout
                        </button>
                    </div>
                </div>
            );
        }else {
            return (
                <div className="container">
                    <Buble/>
                    <div className="content connexion">
                        <form className="connexion" onSubmit={e => this.handleForm(e)}>
                            <div>
                                <label>Identifiant :</label>
                                <input type="text" id="username"
                                       onChange={e => this.setUsername(e)}/>
                            </div>
                            <div>
                                <label>Mot de passe:</label>
                                <input type="password" name="password"
                                       onChange={e => this.setPassword(e)}/>
                            </div>
                            <div className="flex wrap">
                                <button name="signup" onClick={() => this.signUp(this.state.user)}>S'inscrire</button>
                                <button type="submit" name="login">Connexion</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }

    }
}

export const
    ProtectedRoute = (props) => {
        if (Login.getUser())
            return (<Route exact={props.exact} path={props.path} component={props.component}/>);
        return null;
    };

export default Login;
