import React from 'react';

function Avatar(props) {
    return (
        <div className={`flex justify-center items-center w-${props.width} h-${props.height} ${props.background}
         rounded-full ${props.color}`}>
            {props.displayText}
        </div>
    );
}

export default Avatar;
