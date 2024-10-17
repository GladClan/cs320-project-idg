import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditCreature = ( name ) => {

    const navigate = useNavigate();
        const navigateReturn = () => {
            navigate('/Creatures');
    }

    const creature = fetch(`/creatures/read/${name}`, {
        method: "GET",
        headers: {"Content-Type": "application/json",},
    });

    const [newName, setName] = useState(creature.name);
    const [content, setContent] = useState(creature.content);
    const [skills, setSkills] = useState(creature.skills);
    const [items, setItems] = useState(creature.items);
    const [hasName, setHasName] = useState(true);

    const editCreature = (e) => {
        e.preventDefault();
        if (!name) {
            setHasName(false);
            return;
        }
        const response = fetch(`/creatures/update/${name}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({
                name: newName,
                content: content,
                skills: skills,
                items: items,
            }),
        });

        if (response.status !== 204) {
            alert("Failed to update creature");
            return;
        }
        navigateReturn();
    };

    <div className="container">
        <form className="create-creature">
            <h2>Create a new creature</h2>
            <div className="input">
                <p className="name">Name:</p>
                <input id="name-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                {!hasName && <p className="error">Please give your creature a name!</p>}
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
            <button className="btn" type="submit" onClick={editCreature}>
                Finish
            </button>
        </form>
    </div>
}

export default EditCreature;