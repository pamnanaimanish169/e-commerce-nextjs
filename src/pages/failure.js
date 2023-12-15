// Package imports
import React from "react";
import { useRouter } from "next/router";

// Other imports
import styles from "../styles/Home.module.css";

const Failure = () => {
    const router = useRouter();

    return (
        <div className={styles?.cardWrapper}>
            <div className={styles.card}>
                <div className={styles?.checkmarkWrapper}>
                    <span className={styles.failure}>X</span>
                </div>
                <h1 className={styles?.failureMessage}>Failure</h1>
                <p>Your payment has failed. We are working on finding the reason & will keep you posted. Until then you can explore more.</p>
                <button className={styles?.homeButton} onClick={() => router.push('/')}>Home</button>
            </div>
        </div>
    );
};

export default Failure;