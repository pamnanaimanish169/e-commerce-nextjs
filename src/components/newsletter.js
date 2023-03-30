import React, { useRef, useState } from "react";

const Newsletter = () => {
    const inputEl = useRef(null);
    const [message, setMessage] = useState('');

    const subscribe = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/subscribe', {
            body : JSON.stringify({
                email : inputEl?.current.value
            }),
            headers : {
                'Content-Type' : 'application/json',
            },
            method : 'POST'
        });

        const { error } = await res.json();

        if(error) {
            setMessage(error);
            return;
        }

        inputEl.current.value = '';
        setMessage('Success! 🎉 You are now subscribed to the newsletter.')
    }
    return (
        <form onSubmit={subscribe}>
            <label htmlFor="email-input">{'Email Address'}</label>
            <input
                id="email-input"
                name="email"
                placeholder="you@awesome.com"
                ref={inputEl}
                required
                type="email"
            />
            <div>
                {message
                    ? message
                    : `I'll only send emails when new content is posted. No spam.`}
            </div>
            <button type="submit">{'✨ Subscribe 💌'}</button>
        </form>
    )
}

export default Newsletter;


// https://www.sendinblue.com/blog/send-transactional-emails-with-next-js-and-sendinblue/
// https://developers.sendinblue.com/docs/send-a-transactional-email
// API Key - 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