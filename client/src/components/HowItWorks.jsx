import "./HowItWorks.css";

function HowItWorks() {
  const steps = [
    {
      id: 1,
      icon: "👕",
      title: "Upload Clothes",
      description:
        "List your unused clothes with photos and details.",
    },
    {
      id: 2,
      icon: "🔄",
      title: "Swap with Others",
      description:
        "Find clothes you like and send swap requests.",
    },
    {
      id: 3,
      icon: "🌍",
      title: "Save the Planet",
      description:
        "Reduce textile waste by giving clothes a second life.",
    },
  ];

  return (
    <section className="how-it-works">
      <h2>How ReWear Works</h2>

      <div className="steps">
        {steps.map((step) => (
          <div className="step-card" key={step.id}>
            <div className="step-icon">{step.icon}</div>

            <h3>{step.title}</h3>

            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;