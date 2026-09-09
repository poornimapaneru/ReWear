import "./WhyChooseUs.css";

function WhyChooseUs() {
  const features = [
    {
      id: 1,
      icon: "🌱",
      title: "Eco-Friendly",
      description: "Reduce textile waste by swapping clothes instead of buying new ones.",
    },
    {
      id: 2,
      icon: "🔒",
      title: "Secure Swaps",
      description: "Connect safely with verified users and exchange confidently.",
    },
    {
      id: 3,
      icon: "💰",
      title: "Save Money",
      description: "Refresh your wardrobe without spending on new clothes.",
    },
    {
      id: 4,
      icon: "👥",
      title: "Community Driven",
      description: "Join a growing community that supports sustainable fashion.",
    },
  ];

  return (
    <section className="why-choose-us">
      <h2>Why Choose ReWear?</h2>

      <div className="features">
        {features.map((feature) => (
          <div className="feature-card" key={feature.id}>
            <div className="feature-icon">{feature.icon}</div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;