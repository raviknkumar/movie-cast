import React from "react";
import auth from "./../../utils/Auth.js";

const AppLayout = props => {
  return (
    <div>
      <h1>App Layout</h1>
      <button
        onClick={() => {
          auth.logout(() => {
            console.log("Props: ", props.history)
            props.history.push("/");
          });
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default AppLayout;