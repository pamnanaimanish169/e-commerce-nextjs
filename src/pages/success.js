import { useRouter } from "next/router";
import React from "react"
import styles from "../styles/Home.module.css";

const Success = () => {
    const router = useRouter();

    return (
        <div className={styles?.cardWrapper}>
            <div className={styles.card}>
                <div className={styles?.checkmarkWrapper}>
                    <i className={styles.checkmark}>✓</i>
                </div>
                <h1 className={styles?.message}>Success</h1>
                <p>Your payment has been confirmed and will be delivered soon. Please keep shopping!</p>
                <button
                    className={styles?.homeButton}
                    onClick={() => router.push('/')}>Home</button>
            </div>
        </div>
    )
}

export default Success;