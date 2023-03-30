import React from "react";

const Loader = () => {
    return (
        <img style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "50%",
            objectFit: "scale-down"
        }} src='../loading.gif' />
    )
}

export default Loader;