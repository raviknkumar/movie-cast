import React from 'react';

const Button = (props) => {
    return (
        <div className="capitalize pl-2 pr-2 pt-1 pb-1 " onClick={props.onClick}>
            {children}
        </div>
    );
};

export default Button;