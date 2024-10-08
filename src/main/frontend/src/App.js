import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
    const [message, setMessage] = useState('');
    const [firstName, setFirst] = useState('');
    const [lastName, setLast] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const navigate = useNavigate();
        const navigateToHome = () => {
            navigate('/Home');
    }

    const fetchMessage = async (e) => {
        e.preventDefault();
        const response = await fetch('/hello/name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ first: firstName, last: lastName })
        });
        const text = await response.text();
        setMessage(text);
        // first !== '' && last !== '' ? setMessage('Hello, ' + first + ' ' + last + '!')
        //     : first !== '' ? setMessage('Hello, ' + first + '!')
        //         : setMessage("I'd like to know your name first!");
        setSubmitted(true);
    };

    return (
        <>
        <form className={"name-form"} onSubmit={fetchMessage}>
            <h2>Personalized Greeting</h2>
                <div className={"input"}>
                    <p className={"name"}>First name:</p>
                    <input type={"text"} value={firstName} onChange={(e) => setFirst(e.target.value)} />
                </div>
                <div className={"input"}>
                    <p className={"name"}>Last name:</p>
                    <input type={"text"} value={lastName} onChange={(e) => setLast(e.target.value)} />
                </div>
            <button className={"btn"} type={"submit"}>
                Submit
            </button>
            {submitted && (
                <div>
                    <p className={"message"}>{message}</p>
                </div>
            )}
            <button className={"btn"} onClick={navigateToHome}>
                Go Home
            </button>
        </form>
        </>
    );
}

export default App;