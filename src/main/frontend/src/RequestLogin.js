import { useNavigate } from "react-router-dom";

const RequestLogin = (pageName = "this page") => {

    const navigate = useNavigate();
        const navigateLogin = () => {
            navigate('/');
    }

    return (
        <div>
            <h1>Please log in to access {pageName}</h1>
            <button className="btn" onClick={navigateLogin}>Log in</button>
        </div>
    );
}

export default RequestLogin;