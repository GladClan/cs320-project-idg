import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    return (
        <div className="home">
            <h1>Home</h1>
            <img src={`${process.env.PUBLIC_URL}/logo1.png`} alt="logo" />
            <h3>{"Welcome to {this.WebAppName}!"}</h3>
            <p>Get started by navigating to your Character page and creating your first character! When you've created your character, you can view and edit it on the Character page.</p>
            <p>Once you've done that, you can navigate to the creatures page to create your fist creature! On that page, you will be able to see all the creatures you've created and make new ones.</p>
            <p>Forums coming soon!</p>
            <div className="home-card">
                <Link to="/Character" className="link">Character Page</Link>
                <Link to="/Creatures" className="link">Creatures Page</Link>
            </div>
        </div>
    );
}

export default Home;