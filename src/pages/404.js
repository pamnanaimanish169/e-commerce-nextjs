// Package imports
import React from "react";
import { useRouter } from "next/router";

// Other imports
import styles from "../styles/Home.module.css";

const Custom404 = () => {
    const router = useRouter();

    return (
        <div className={styles?.NotFoundContainer}>
            <h1>
                404 - Page Not Found
            </h1>
            <button className={styles.backToHomeBtn} onClick={() => router.push('../')}>Back to Home</button>
        </div>
    );
};

export default Custom404;