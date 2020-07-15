import React, {createContext} from "react";

export const AuthContext = createContext();

class AuthContextProvider extends React.Component{

    state = {
        isAuthenticated: true,
        user: null
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

    render() {
        return(
            <AuthContext.Provider value={{
                ...this.state,
                toggleAuthenticated: this.toggleAuthenticated,
                setUserDetails: this.setUserDetails,
                getUser: this.getUser,
                getUserName: this.getUserName
            }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export default AuthContextProvider;

