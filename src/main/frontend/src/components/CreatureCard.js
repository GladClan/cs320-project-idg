import "./CreatureCard.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreatureCard = ({ image, name, content, skills, items }) => {
  const defaultImage = image || `${process.env.PUBLIC_URL}/hoodie_gen.png`;

  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const editCreature = () => {
    navigate(`/edit/${name}`);
  };

  const deleteCreature = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    fetch(`/creatures/delete/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name }),
    });
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className="creature-card">
      <div>
        <h2>{name}</h2>
        <div className="image-container">
          <img src={defaultImage} alt={name} className="image" />
        </div>
      </div>
      <div>
        <p>{content}</p>
        <div className="about">
          <div>Inventory:</div>
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <div>Skills:</div>
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <button className="btn" onClick={editCreature}>Edit</button>
          <button className="btn" onClick={deleteCreature}>Delete
            {showConfirm && (
              <div className="confirm-dialog">
                <p className="error">Are you sure you want to delete {name}?</p>
                <button onClick={confirmDelete}>Yes</button>
                <button onClick={cancelDelete}>No</button>
              </div>
            )}
          </button>
        </div>
      </div>
      
    </div>
  );
};

CreatureCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CreatureCard;