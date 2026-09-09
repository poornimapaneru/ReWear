import "./FeaturedClothes.css";
import denim from "../assests/clothes/denim.jpg";
import hoodie from "../assests/clothes/hoodie.jpg";
import dress from "../assests/clothes/dress.jpg";

function FeaturedClothes() {
  const clothes = [
    {
      id: 1,
      image: denim,
      title: "Denim Jacket",
      size: "M",
    },
    {
      id: 2,
      image: hoodie,
      title: "White Hoodie",
      size: "L",
    },
    {
      id: 3,
      image: dress,
      title: "Summer Dress",
      size: "S",
    },
  ];

  return (
    <section className="featured">
      <h2>Featured Clothes</h2>

      <div className="featured-grid">
        {clothes.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.image} alt={item.title} />

            <h3>{item.title}</h3>

            <p>Size: {item.size}</p>

            <button>View Details</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedClothes;