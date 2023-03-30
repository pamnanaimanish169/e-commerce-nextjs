import { useRouter } from "next/router";
import React from "react";

const Custom404 = () => {
    const router = useRouter();

    return (
        <div className="container" style={{
            margin: "0",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign : 'center'
        }}>
            <h1>
                404 - Page Not Found
            </h1>
            <button
                style={{
                    background: "black",
                    color: "white",
                    borderRadius: "10px",
                    border: "none",
                    padding: "10px"
                }}
                onClick={() => router.push('../')}
            >Back to Home</button>
        </div>
    )
}

export default Custom404;