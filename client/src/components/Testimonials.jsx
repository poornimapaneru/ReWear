import "./Testimonials.css";

function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Aarav Sharma",
      review:
        "ReWear helped me exchange clothes easily. The platform is simple and environmentally friendly.",
    },
    {
      id: 2,
      name: "Priya Verma",
      review:
        "I refreshed my wardrobe without spending money. The swap process was smooth.",
    },
    {
      id: 3,
      name: "Rohan Singh",
      review:
        "A great idea for sustainable fashion. I would definitely recommend ReWear.",
    },
  ];

  return (
    <section className="testimonials">
      <h2>What Our Users Say</h2>

      <div className="testimonial-grid">
        {reviews.map((review) => (
          <div className="testimonial-card" key={review.id}>
            <p>"{review.review}"</p>
            <h3>{review.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;