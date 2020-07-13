import React, {Component} from "react";
import socketIOClient from "socket.io-client";
import './header.css'
import {NavLink} from "react-router-dom";
import {getRoom, getUserName} from "../utils/CommonUtils";
import Qs from 'qs';

// The Header creates links that can be used to navigate
// between routes.
var socket;

const logout = () => {
    console.log("Logging Out User");
    socket = null;
    localStorage.clear();
};

class Header extends Component {
    /* Creating a Socket client and exporting it at the end to be used across the Place Order, Kitchen, etc components*/

    constructor() {
        super();
        this.state = {
            endpoint: 'http://localhost:3001/'
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
                            <NavLink exact to="/">
                                Place Order
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/movie">Watch Movie</NavLink>
                        </li>

                        <button className="float-right" onClick={logout}>
                            Logout
                        </button>
                    </ul>
                </nav>
            </header>
        );
    }
}

export {Header, socket};
