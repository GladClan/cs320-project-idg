import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
    const [message, setMessage] = useState(''); // Message to display to the user if the login was successful or not
    const [username, setUsername] = useState('');
    const [hasName, setHasName] = useState(true);
    const [password, setPassword] = useState('');
    const [hasPass, setHasPass] = useState(true);
    const [status, setStatus] = useState(0);

    const navigate = useNavigate();
        const navigateToHome = () => {
            navigate('/Home');
    }
        const navigateToSignup = () => {
            navigate('/signup');
    }

    // Function to handle the login form submission. Validates the user inputs and sends the information to the server (LoginResource.java)
    const handleLoginForm = async (e) => {
        e.preventDefault();
        if (!username) {
            setHasName(false);
        } else { setHasName(true); }
        if (!password) {
            setHasPass(false);
        } else { setHasPass(true); }
        if (!username || !password) {
            return;
        }
        setMessage("Welcome!");
        console.log("Fetching account: " + username + " " + password);
        const response = await fetch('/signup/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: username, password: password })
        });
        console.log("Fetch complete");
        setStatus(response.status);
        const text = await response.text();
        setMessage(text);
        if (response.status === 400) {
            setMessage(text);
        }
        if (response.status === 200) {
            navigateToHome();
        }
        else {
            setMessage(text);
        }
    };

    return (
        <div className={"name-form"}>
            <form onSubmit={handleLoginForm}>
                <h2>Signin</h2>
                    <div className={"form"}>
                        <p className={"name"}>Username:</p>
                        <input type={"text"} value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    {!hasName && <p className='error'>Please enter your username</p>}
                    <div className={"form"}>
                        <p className={"name"}>Password:</p>
                        <input type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {!hasPass && <p className='error'>Please enter your password</p>}
                    
                <button className={"btn"} type={"submit"}>
                    Sign in
                </button>
                {status !== 0 && <p className='error'>{message}</p>}
            </form>
            <p style={{fontWeight: 'bold'}}>Don't have an account? Sign up today!</p>
            <button className={"btn"} onClick={navigateToSignup}>
                Sign up
            </button>
        </div>
    );
}

export default App;