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
        <form className={"name-form"} onSubmit={fetchMessage}>
            <h2>Signin</h2>
                <div className={"form"}>
                    <p className={"name"}>Email or username:</p>
                    <input type={"text"} value={firstName} onChange={(e) => setFirst(e.target.value)} />
                </div>
                <div className={"form"}>
                    <p className={"name"}>Password:</p>
                    <input type={"text"} value={lastName} onChange={(e) => setLast(e.target.value)} />
                </div>
                
            <button className={"btn"} type={"submit"}>
                Sign in
            </button>
            {submitted && (
                <div>
                    <p className={"message"}>{message}</p>
                </div>
            )}
        </form>
    );
}

export default App;