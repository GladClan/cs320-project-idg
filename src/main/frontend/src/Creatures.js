import "./Creatures.css";
import CreatureCard from "./components/CreatureCard";
import React, { useState } from "react";

function Creatures() {
    const [creatures, setCreatures] = useState([]);
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [skills, setSkills] = useState("");
    const [items, setItems] = useState("");

    const [hasCreatures, setHasCreatures] = useState(false);

    // const [skill, setSkill] = useState("");
    // const [skills, setSkills] = useState([]);
    // const [item, setItem] = useState("");
    // const [items, setItems] = useState([]);

    // const [hasSkills, setHasSkills] = useState(false);
    // const [hasItems, setHasItems] = useState(false);

    const newCreature = (e) => {
        e.preventDefault();
        const newCreature = {
            name: name,
            content: content,
            skills: skills.split(","),
            items: items.split(","),
        };
        setCreatures([...creatures, newCreature]);
        setHasCreatures(true);
        setName("");
        setContent("");
        setSkills("");
        setItems("");
    };

    // const addThing = (thing, things, setThing, setThings, setHasThing) => {
    //     if (thing) {
    //         setThings([...things, thing]);
    //         setHasThing(true);
    //         setThing("");
    //         console.log(things);
    // }}

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
                    </div>
                    <div className="input">
                        <p>Description:</p>
                        <input id="description-input" className="description" type="text" value={content} onChange={(e) => setContent(e.target.value)} />
                    </div>
                    <div className="input">
                        <p>Skills:</p>
                        <input id="skills-input" type="text" value={skills} onChange={(e) => setSkills(e.target.value)} />
                        {/* <button className="btn" onClick={addThing(skill, skills, setSkill, setSkills, setHasSkills)}>Add Skill</button>
                        {hasSkills && (
                            <ul>
                                {skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        )} */}
                    </div>
                    <div className="input">
                        <p>Items:</p>
                        <input id="items-input" type="text" value={items} onChange={(e) => setItems(e.target.value)} />
                        {/* <button className="btn" onClick={addThing(item, items, setItem, setItems, setHasItems)}>Add Item</button>
                        {hasItems && (
                            <ul>
                                {items.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        )} */}
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