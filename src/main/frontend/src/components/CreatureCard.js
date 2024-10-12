import "./CreatureCard.css";
import PropTypes from "prop-types";

const CreatureCard = ({ image, name, content, skills, items, link }) => {
  const defaultImage = image || `${process.env.PUBLIC_URL}/hoodie_gen.png`;

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
        {link && (
          <a href={link} target="_blank" rel="noreferrer">
            {link}
          </a>
        )}
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
  link: PropTypes.string
};

export default CreatureCard;