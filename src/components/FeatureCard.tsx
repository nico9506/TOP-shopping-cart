import "../styles/FeatureCard.css";

interface Props {
  title: string;
  description: string;
}

const FeatureCard = ({ title, description }: Props) => {
  return (
    <div className="feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
