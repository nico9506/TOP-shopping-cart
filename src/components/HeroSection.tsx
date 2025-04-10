import "../styles/HeroSection.css";

interface Props {
  title: string;
  description: string;
  btnName: string;
  btnFunction: () => void;
}

const HeroSection = ({ title, description, btnName, btnFunction }: Props) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <button className="cta-button" onClick={btnFunction}>
          {btnName}
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
