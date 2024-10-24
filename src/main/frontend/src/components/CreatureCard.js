import "./CreatureCard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreatureCard = ({ image, name, description, skills, items }) => {
  const defaultImage = image || `${process.env.PUBLIC_URL}/hoodie_gen.png`;

  const navigate = useNavigate();

  const editCreature = () => {
    navigate(`/edit/${name}`);
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
        <p>{description}</p>
        <div className="about">
          <div>Inventory:</div>
          <p>{items}</p>
          {/* <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul> */}
          <div>Skills:</div>
          <p>{skills}</p>
          {/* <ul>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul> */}
        </div>
        <div>
          <button className="btn" onClick={editCreature}>Edit</button>
        </div>
      </div>
      
    </div>
  );
};

export default CreatureCard;