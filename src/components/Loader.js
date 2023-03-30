import React from "react";
import styles from "../styles/Home.module.css";

const Loader = () => {
    return (
        <img className={styles.loader} src='../loading.gif' />
    )
}

export default Loader;