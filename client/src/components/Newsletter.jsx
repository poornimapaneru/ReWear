import "./Newsletter.css";

function Newsletter() {
  return (
    <section className="newsletter">
      <div className="newsletter-container">
        <h2>Stay Updated with ReWear</h2>

        <p>
          Get the latest clothing swaps, sustainability tips, and platform
          updates delivered to your inbox.
        </p>

        <form className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email"
          />

          <button type="submit">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;