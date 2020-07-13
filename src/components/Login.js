import React, {useState} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {randomString} from "../utils/CommonUtils";
import {loginConstants} from "../utils/Constants";
import { useHistory } from "react-router-dom";
import {createConnection} from "../global/header";

const Login = (props) => {

    const history = useHistory();

    const [room] = useState(randomString(9));
    const [username, setUserName] = useState('');
    const [joiningUserRoom, setJoiningUserRoom] = useState('');

    function joinRoom(e) {
        e.preventDefault();
        console.log("Joining:");
        console.log(username);
        console.log(joiningUserRoom);

        localStorage.setItem(loginConstants.username, username);
        localStorage.setItem(loginConstants.room, joiningUserRoom);
        history.push("/");
    }

    function createRoom(e) {
        e.preventDefault();
        console.log("Creating:");
        console.log(username);
        console.log(room);

        localStorage.setItem(loginConstants.username, username);
        localStorage.setItem(loginConstants.room, room);
        history.push("/");
    }

    return (
        <div className={""}>
            <Tabs>
                <TabList>
                    <Tab>Create</Tab>
                    <Tab>Join</Tab>
                </TabList>

                <TabPanel>
                    <div className="w-full max-w-xs items-center mt-2">

                        <form className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4" action={"/"}>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    Username
                                </label>
                                <input
                                    name={"username"}
                                    onChange={event => setUserName(event.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username" type="text" placeholder="Username"/>
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="room">
                                    room
                                </label>
                                <input
                                    name="room"
                                    value={room}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="room" type="text" placeholder="room" readonly/>
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit">
                                    Create Room
                                </button>
                            </div>
                        </form>
                        <p className="text-center text-gray-500 text-xs">
                            &copy;2020 Acme Corp. All rights reserved.
                        </p>
                    </div>

                </TabPanel>

                <TabPanel>

                    <div className="w-full max-w-xs items-center mt-2">
                        <form className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4" action={"/"}>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    Username
                                </label>
                                <input
                                    name={"username"}
                                    onChange={event => setUserName(event.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username" type="text" placeholder="Username"/>
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="room">
                                    room
                                </label>
                                <input
                                    name={"room"}
                                    value={joiningUserRoom}
                                    onChange={event => setJoiningUserRoom(event.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="room" type="text" placeholder="room"/>
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit">
                                    Join Room
                                </button>
                            </div>
                        </form>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Login;
