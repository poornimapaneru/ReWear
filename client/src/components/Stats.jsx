import "./Stats.css";

function Stats() {
  const stats = [
    {
      id: 1,
      number: "10K+",
      title: "Registered Users",
    },
    {
      id: 2,
      number: "25K+",
      title: "Clothes Swapped",
    },
    {
      id: 3,
      number: "15 Tons",
      title: "Textile Waste Reduced",
    },
    {
      id: 4,
      number: "100+",
      title: "Cities Connected",
    },
  ];

  return (
    <section className="stats">
      <div className="stats-container">
        {stats.map((item) => (
          <div className="stat-card" key={item.id}>
            <h2>{item.number}</h2>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;