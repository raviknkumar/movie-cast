import React, {Component} from "react";
import socketIOClient from "socket.io-client";
import './header.css'
import {NavLink, withRouter} from "react-router-dom";
import auth from "../utils/Auth"
import Qs from 'qs';
import {movieCastUrl} from "./../api/request";
import {AuthContext} from "../contexts/AuthContext";

// The Header creates links that can be used to navigate
// between routes.
var socket;

class HeaderComponent extends Component {

    /* Creating a Socket client and exporting it at the end to be used across the Place Order, Kitchen, etc components*/

    static contextType = AuthContext;

    constructor() {
        super();

        console.log(this.context);
        this.state = {
            endpoint: movieCastUrl(),
        };

        console.log("Trying to connect to server");

        const {username, room} = Qs.parse(window.location.search, {
            ignoreQueryPrefix: true
        });
        console.log("Username ", username, " ROom ", room);
        socket = socketIOClient(this.state.endpoint, {'query': `username=${username}&room=${room}`});
    }

    render() {

        return (
            <header>
                <nav>
                    <ul className="NavClass">
                        <li>
                            <NavLink exact to="/home">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/">Login</NavLink>
                        </li>

                        <div className="float-right">
                        <span className="inline-block p-2">
                            RoomId: {this.context.getUser().room}
                        </span>
                            <button className="ml-2"
                                    onClick={() => {
                                        auth.logout(() => {
                                            this.props.history.push("/");
                                        }, socket);
                                    }}>
                                Logout
                            </button>
                        </div>
                    </ul>
                </nav>
            </header>
        );
    }
}

let Header = withRouter(HeaderComponent);
export {Header, socket};
