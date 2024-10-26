import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EditCreature = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const { name } = queryParams.get("name");
    const [creature, setCreature] = useState({});

    const [newName, setName] = useState("");
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState("");
    const [items, setItems] = useState("");
    const [hasName, setHasName] = useState(true);
    const [message, setMessage] = useState(""); // Used to show an error message if there is an error on update or delete.

    const [showConfirm, setShowConfirm] = useState(false); // Used to show the confirm dialog on delete.

    // Fetches the creature data from the server using the name parameter.
    useEffect(() => {
        const fetchCreature = async () => {
            console.log("Fetching " + name);
            const response = await fetch(`${API_URL}/creatures/read/${name}`,
                { method: "PATCH", headers: { "Content-Type": "application/json" } }
            );
            console.log("Fetched creature: " + name);
            const data = await response.json();
            setCreature(data);
            console.log("Creature: " + data.name + ", " + data.description);
            setName(data.name);
            data.description != null ? setDescription(data.description) : setDescription("");
            data.skills != null ? setSkills(data.skills) : setSkills("");
            data.items != null ? setItems(data.items) : setItems("");
        };
        fetchCreature();
    }, [name]);

    const navigate = useNavigate();
        const navigateReturn = () => {
            navigate('/Creatures');
    }

    // Updates the creature data on the server and navigates back to the Creatures page.
    const syncEdits = async (e) => {
        e.preventDefault();
        if (!newName) {
            setHasName(false);
            return;
        }
        console.log("Updating creature: " + name);
        const response = await fetch(`${API_URL}/creatures/update/${name}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({
                id: creature.id,
                name: newName,
                description: description,
                skills: skills,
                items: items,
            }),
        });
        console.log("Creature updated");
        if (response.status !== 200) {
            console.log("Status: " + response.status + ", " + response.statusText);
            setMessage("Failed to update creature");
            return;
        }
        navigateReturn();
    };

    // Sets the boolean true to display the confirm dialog to delete the creature.
    const deleteCreature = () => {
        setShowConfirm(true);
    };

    // Deletes the creature data on the server and navigates back to the Creatures page.
    const confirmDelete = async () => {
        const response = await fetch(`${API_URL}/creatures/delete/`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                description: description,
                skills: skills,
                items: items
            }),
        });
        if (response.status !== 200) {
            console.log("Status: " + response.status + ", " + response.statusText);
            setMessage("Failed to delete creature");
            setShowConfirm(false);
            return;
        }
        else {
            navigateReturn();
        }
    };

    // Sets the boolean false to hide the confirm dialog to delete the creature.
    const cancelDelete = () => {
        setShowConfirm(false);
    };


    return (
        <div className="container">
            <div className="create-creature">
                <h2>Create a new creature</h2>
                <div className="input">
                    <p className="name">Name:</p>
                    <input type="text" value={newName} onChange={(e) => setName(e.target.value)} />
                    {!hasName && <p className="error">Please give your creature a name!</p>}
                </div>
                <div className="input">
                    <p>Description:</p>
                    <input className="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="input">
                    <p>Skills:</p>
                    <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} />
                </div>
                <div className="input">
                    <p>Items:</p>
                    <input type="text" value={items} onChange={(e) => setItems(e.target.value)} />
                </div>
                <button className="btn" type="submit" onClick={syncEdits}>
                    Finish
                </button>
                {message && <p className="error">{message}</p>}
                <button className="btn" onClick={deleteCreature}>Delete  
                </button>
                {showConfirm && (
                    <div className="confirm-dialog">
                    <p className="error">Are you sure you want to delete {newName}?</p>
                    <button onClick={confirmDelete}>Yes</button>
                    <button onClick={cancelDelete}>No</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EditCreature;