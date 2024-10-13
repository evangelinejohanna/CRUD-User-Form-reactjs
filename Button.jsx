import React from "react";

const Button = ({children, onClick, label}) =>{
    return(
        <button onClick={onClick} label={label} > 
            {children}
            {label}
        </button>
    );
};

export default Button; 