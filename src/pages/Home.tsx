import FeatureCard from "../components/FeatureCard";
import HeroSection from "../components/HeroSection";
import "../styles/Home.css";

const Home = () => {
  return (
    <>
      <HeroSection
        title="New Season Arrivals"
        description="Discover our curated collection of premium fashion"
        btnName="Explore Collection"
        btnFunction={() => alert("Redirect to the shop")}
      ></HeroSection>

      <div className="features">
        <FeatureCard
          title="Free Shipping"
          description="On all orders over $99"
        ></FeatureCard>
        <FeatureCard
          title="30-Day Returns"
          description="No questions asked"
        ></FeatureCard>
        <FeatureCard
          title="Secure Checkout"
          description="100% protected transaction"
        ></FeatureCard>
      </div>

      <section className="about-section">
        <h2>About Our Store</h2>
        <p className="about-text">
          Welcome to MockStore, your premier destination for contemporary
          fashion. We blend modern aesthetics with timeless quality to bring you
          exceptional pieces that elevate your everyday style.
        </p>
      </section>
    </>
  );
};
export default Home;
