import "./Character.css";
import React, { useState } from 'react';


const Character = () => {
    const [characterName, setCharacterName] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState('');
    const [items, setItems] = useState('');

    const [hasCharacter, setHasCharacter] = useState(false);

    const newCharacter = (e) => {
        e.preventDefault();
        if (!characterName) {
            alert("Please give your character a name!");
            return;
        }
        if (!description) {
            alert("Say something about " + characterName + ", give them a description!");
            return;
        }
        // const newCharacter = {
        //     characterName: characterName,
        //     description: description,
        //     skills: skills.split(","),
        //     ,items: items.split(","),
        // };
        setHasCharacter(true);
    }

    return (
        <div>
            {hasCharacter ? (
            <div className="character">
                <div class="character-card">
                    <h1>{characterName}</h1>
                    <img src={`${process.env.PUBLIC_URL}/hoodie_chibi.png`} alt={characterName} />
                    <p>{description}</p>
                    <p className="name">Skills:</p>
                    <p>{skills}</p>
                    <p className="name">Items:</p>
                    <p>{items}</p>
                </div>
            <button className="btn" onClick={() => setHasCharacter(false)}>Edit</button>
            </div>
            ) : (
            <div className="character">
                <div className="character-card">
                    <h2>Create your character</h2>
                    <form onSubmit={newCharacter}>
                        <div className="field">
                            <p className="name">Name:</p>
                            <input type="text" value={characterName} onChange={(e) => setCharacterName(e.target.value)}/>
                        </div>
                        <div className="field">
                            <p className="name">Description:</p>
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                        <div className="field">
                            <p className="name">Skills:</p>
                            <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)}/>
                        </div>
                        <div className="field">
                            <p className="name">Items:</p>
                            <input type="text" value={items} onChange={(e) => setItems(e.target.value)}/>
                        </div>
                        <button className="btn" type="submit">Save and create!</button>
                    </form>
                </div>
            </div>
            )}
        </div>
    );
    };

export default Character;