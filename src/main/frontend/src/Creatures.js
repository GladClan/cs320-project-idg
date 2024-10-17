import "./Creatures.css";
import CreatureCard from "./components/CreatureCard";
import React, { useState } from "react";

function Creatures() {
    const [creatures, setCreatures] = useState([]);
    const [name, setName] = useState("");
    const [hasName, setHasName] = useState(true);
    const [content, setContent] = useState("");
    const [skills, setSkills] = useState("");
    const [items, setItems] = useState("");

    const [hasCreatures, setHasCreatures] = useState(false);

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
                items: items,
            }),
        });
        setCreatures(
            fetch("/creatures/read"), {
                method: "GET",
                headers: {"Content-Type": "application/json",},
            }
        );
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
                        <input id="name-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        {!hasName && <p className="error">*Please give your creature a name!</p>}
                    </div>
                    <div className="input">
                        <p>Description:</p>
                        <input id="description-input" className="description" type="text" value={content} onChange={(e) => setContent(e.target.value)} />
                    </div>
                    <div className="input">
                        <p>Skills:</p>
                        <input id="skills-input" type="text" value={skills} onChange={(e) => setSkills(e.target.value)} />
                    </div>
                    <div className="input">
                        <p>Items:</p>
                        <input id="items-input" type="text" value={items} onChange={(e) => setItems(e.target.value)} />
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