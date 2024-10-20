import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

    const [userName , setUserName] = useState("");
    const [password , setPassword] = useState("");
    const [email , setEmail] = useState("");
    
    const navigate = useNavigate();
    const navigateToSignin = () => {
        navigate('/');
    }

    const validateForm = async (e) => {
        e.preventDefault();
        console.log("Validating form...");
        if (email === "") {
            alert("Please enter an email");
            return false;
        }
        if (userName === "") {
            alert("Please enter a username");
            return false;
        }
        if (password === "") {
            alert("Please enter a password");
            return false;
        }if (password !== document.getElementById("confirmPassword").value) {
            alert("Passwords do not match");
            return false;
        }
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: userName, email: email, password: password })
        });
        console.log("Validated successfully.");
        const status = response.status;
        const text = await response.text();
        console.log("Status: " + status + "\nResponse: " + text);
        if (status === 400) {
            alert(text);
        }
        else if (status === 201) {
            navigateToSignin();
        }
        return true;
    }

    return (
        <div className={"name-form"}>
            <form onSubmit={validateForm}>
                <div>
                    <h1>Signup today!</h1>
                    <p>Sign up for Proteus today and start creating your own characters and creatures!</p>
                        <div className={"form"}>
                            <p className={"name"}>Email:</p>
                            <input id={"email"} type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={"form"}>
                            <p className={"name"}>Username:</p>
                            <input id={"username"} type={"text"} value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        <div className={"form"}>
                            <p className={"name"}>Password:</p>
                            <input id={"password"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className={"form"}>
                            <p className={"name"}>Confirm password:</p>
                            <input id={"confirmPassword"} type={"password"} />
                        </div>
                    <button className={"btn"} type={"submit"}>
                        Sign up
                    </button>
                </div>
            </form>
            <p>Already have an account?</p>
            <button className={"btn"} onClick={navigateToSignin}>
                Sign in
            </button>
        </div>
    );
}

export default Signup;

/*
.name-form {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 12px;
    border: 1px solid lightgray;
    border-radius: 6px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 420px;
    row-gap: 12px;
    background-color: darkgray;
  }

  h2 {
    text-align: center;
  }
  
.form {
    display: flex;
    flex-direction: column;

  & input {
      width: 100%;
      padding: 12px;
      margin: 8px 0px;
      display: inline-block;
      border: 1px solid #ccc;
      box-sizing: border-box;
  }
}

.name {
}

.btn {
  max-width: 100px;
  margin: auto;
  padding: 0.5rem 1rem;
  border: 1px solid #000;
  background-color: #d5d5d5;
  cursor: pointer;

    &:hover {
        background-color: #c0c0c0;
    }
}

.message {
    text-align: center;
}
*/