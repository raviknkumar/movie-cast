import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import './header.css'
import { NavLink, withRouter } from "react-router-dom";
import auth from "../utils/Auth"
import Qs from 'qs';
import { movieCastUrl } from "./../api/request";
import { AuthContext } from "../contexts/AuthContext";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
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

        const { username, room } = Qs.parse(window.location.search, {
            ignoreQueryPrefix: true
        });
        console.log("Username ", username, " ROom ", room);
        socket = socketIOClient(this.state.endpoint, { 'query': `username=${username}&room=${room}` });
    }

    render() {

        return (
            <header style={{ backgroundColor: "#3C3CA1", position: 'sticky'}}>
                <ul className="NavClass">
                    <li>
                        <NavLink exact to="/home">
                            Home
                            </NavLink>
                    </li>
                    <li>
                        <NavLink to="/">Login</NavLink>
                    </li>

                    <div className="float-right text-white">
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
            </header>
        );
    }
}

let Header = withRouter(HeaderComponent);
export { Header, socket };
