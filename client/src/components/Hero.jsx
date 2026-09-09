import heroImage from "../assests/hero.png";
import "./Hero.css";

function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Swap Clothes, Not the planet.</h1>
                
                <p>Join ReWear and exchange clothes with people near you.
          Give your unused clothes a second life while promoting
          sustainable fashion.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Start Swapping</button>
          <button className="secondary-btn">Browse Clothes</button>
        </div>
      </div>

      <div className="hero-image">
        <img src={heroImage} alt="Clothing Illustration" />
      </div>
    </section>
  );
}

export default Hero;

            