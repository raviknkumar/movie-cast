import React, {createContext} from "react";

export const AuthContext = createContext();

class AuthContextProvider extends React.Component{

    state = {
        isAuthenticated: true,
        user: {username:'Test', room:'abc'},
        host: true
    };

    toggleAuthenticated = () =>{
        this.setState({isAuthenticated: !this.state.isAuthenticated});
    };

    setUserDetails = (user) =>{
        console.log("Update User Details", user);
        this.setState({user: user});
    };

    getUserName = () => {
         let user = this.state.user;
         if(user){
             return user.username;
         }
         return "anonymous";
    };

    getUser = () => {
        return this.state.user;
    };

    isHost = () => {
        return this.state.host;
    };

    setHost = (host) => {
        console.log("Setting Host to " + host);
        this.setState({ host});
    };

    toggleHost = () => {        
        let host = this.state.host;
        this.setState({host: !host});
        console.log("Host set to " + !host);
    }


    render() {
        return(
            <AuthContext.Provider value={{
                ...this.state,
                toggleAuthenticated: this.toggleAuthenticated,
                setUserDetails: this.setUserDetails,
                getUser: this.getUser,
                getUserName: this.getUserName,
                isHost: this.isHost,
                setHost: this.setHost,
                toggleHost: this.toggleHost
            }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export default AuthContextProvider;

