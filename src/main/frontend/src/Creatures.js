import "./Creatures.css";
import CreatureCard from "./components/CreatureCard";
import React, { useEffect, useState } from "react";

function Creatures() {
    const [creatures, setCreatures] = useState([]);
    const [name, setName] = useState("");
    const [hasName, setHasName] = useState(true);
    const [content, setContent] = useState("");
    const [skills, setSkills] = useState("");
    const [items, setItems] = useState("");

    const [hasCreatures, setHasCreatures] = useState(false);

    const fetchCreatures = async () => {
        console.log("Fetching creatures...");
        const response = await fetch("/creatures/read", {
            method: "GET",
            headers: {"Content-Type": "application/json",},
        });
        console.log("Fetched creatures.");
        const data = await response.json();
        console.log("Creatures: " + data);
        setHasCreatures(data.length > 0);
        console.log("Has creatures: " + hasCreatures);
        return data;
    };

    useEffect(() => {
        setCreatures(fetchCreatures());
    }, []);

    const newCreature = (e) => {
        e.preventDefault();
        if (!name) {
            setHasName(false);
            return;
        }
        const response = fetch("/creatures/create", {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({
                name: name,
                content: content,
                skills: skills,
                items: items
            }),
        });
        setCreatures(fetchCreatures());
        setHasCreatures(creatures.length > 0);
        setName("");
        setContent("");
        setSkills("");
        setItems("");
    };

    return (
        <div>
            <h1>Creatures</h1>
            <div className="creature-list">
                {hasCreatures && creatures.map((creature, index) => (
                    <CreatureCard key={index} name={creature.name} content={creature.content} skills={creature.skills} items={creature.items} />
                ))}
            </div>

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
                        <input className="description" type="text" value={content} onChange={(e) => setContent(e.target.value)} />
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
        </div>
    );
}

export default Creatures;