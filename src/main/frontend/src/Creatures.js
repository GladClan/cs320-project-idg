import "./Creatures.css";
import CreatureCard from "./components/CreatureCard";
import React, { useEffect, useState } from "react";
import { API_URL } from './config';

function Creatures() {
    const [creatures, setCreatures] = useState([]);
    const [name, setName] = useState("");
    const [hasName, setHasName] = useState(true);
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState("");
    const [items, setItems] = useState("");

    const [hasCreatures, setHasCreatures] = useState(false);

    // Runs once on load to fetch the creatures from the server (see the useEffect below, line 39).
    // This is a PATCH request because GET does not seem to be working as of 10/20/2024. A GET request freezes the server on localhost:8080
    // Sends the request to the server (file: CreatureResource.java)
    const fetchCreatures = async () => {
        console.log("Fetching creatures...");
        const response = await fetch(`${API_URL}/creatures/read`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json",},
        });
        console.log("Fetched creatures.");
        const data = await response.json();
        let logString = "Creatures fetched: \n";
        for (let i = 0; i < data.length; i++) {
            logString += ("Creature " + i + ": " + data[i] + "\n");
            // for (let key in data[i]) {
            //     console.log(key + ": " + data[i][key]);
            // }
        }
        console.log(logString);
        setCreatures(data);
        setHasCreatures(data.length > 0 && Array.isArray(data));
        console.log("Has creatures: " + (data.length > 0) + ", Length: " + data.length);
    };

    useEffect(() => {
        fetchCreatures();
    }, []);

    // Function to create a new creature and then reset all the field values. Validation is only included for the name field.
    // Sends a POST request to the server (file: CreatureResource.java)
    const newCreature = (e) => {
        e.preventDefault();
        if (!name) {
            setHasName(false);
            return;
        }
        const response = fetch(`${API_URL}/creatures/create`, {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({
                name: name,
                description: description,
                skills: skills,
                items: items
            }),
        });
        fetchCreatures();
        setHasCreatures(creatures != null && creatures.length > 0);
        setName("");
        setDescription("");
        setSkills("");
        setItems("");
    };

    return (
        <div>
            <div className="container">
                <form className="create-creature">
                    <h2>Create a new creature</h2>
                    <div className="input">
                        <p className="name">Name:</p>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        {!hasName && <p className="error" style={{color: 'red'}}>*Please give your creature a name!</p>}
                    </div>
                    <div className="input">
                        <p>Description:</p>
                        <input className="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="input">
                        <p>Skills or proficiencies:</p>
                        <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} />
                    </div>
                    <div className="input">
                        <p>Items:</p>
                        <input type="text" value={items} onChange={(e) => setItems(e.target.value)} />
                    </div>
                    <button className="btn" type="submit" onClick={newCreature}>
                        Create Creature
                    </button>
                </form>
            </div>

            <h1>Creatures</h1>
            <div className="creature-list">
                {hasCreatures && creatures != null && creatures.map((creature, index) => (
                    <CreatureCard key={index} name={creature.name} description={creature.description} skills={creature.skills} items={creature.items} />
                ))}
            </div>
        </div>
    );
}

export default Creatures;