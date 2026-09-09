import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./Marketplace.css";

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedSize, setSelectedSize] = useState("All Sizes");
  const [userLocation, setUserLocation] = useState("");
  const [locationMatch, setLocationMatch] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get("/profile");
        setUserLocation(response.data.location || "");
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const fetchClothes = async () => {
      try {
        const response = await API.get("/clothing");
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching clothes:", error);
      }
    };

    fetchClothes();
    fetchProfile();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" ||
      product.category === selectedCategory;

    const matchesSize =
      selectedSize === "All Sizes" ||
      product.size === selectedSize;

    const matchesLocation =
      !locationMatch ||
      !userLocation ||
      product.location?.toLowerCase() === userLocation.toLowerCase();

    return (
      matchesSearch &&
      matchesCategory &&
      matchesSize &&
      matchesLocation
    );
  });

  return (
    <div className="marketplace">
      <div className="marketplace-header">
        <h1>Browse Clothes</h1>

        <p>
          Discover amazing clothes shared by our community and request a swap.
        </p>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search clothes..."
          className="search-box"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option>All Categories</option>
          <option>Men</option>
          <option>Women</option>
          <option>Kids</option>
          <option>Jacket</option>
        </select>

        <select
          className="filter"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option>All Sizes</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>

        <label className="location-filter">
          <input
            type="checkbox"
            checked={locationMatch}
            onChange={(e) => setLocationMatch(e.target.checked)}
          />
          My Location
        </label>
      </div>

      <div className="products">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product._id}>
            <img
              src={
                product.image
                  ? `http://localhost:5000${product.image}`
                  : "https://via.placeholder.com/300x300?text=No+Image"
              }
              alt={product.title}
            />

            <h3>{product.title}</h3>

            <p>
              <strong>Category:</strong> {product.category}
            </p>

            <p>
              <strong>Brand:</strong> {product.brand}
            </p>

            <p>
              <strong>Size:</strong> {product.size}
            </p>

            <p>
              <strong>Condition:</strong> {product.condition}
            </p>

            <p>
              <strong>Swap Value:</strong> {product.swapValue}
            </p>

            <p>
              <strong>Owner:</strong> {product.owner?.name}
            </p>

            <p>
              <strong>Location:</strong> {product.location}
            </p>

            <Link to={`/item/${product._id}`}>
              <button className="details-btn">
                View Details
              </button>
            </Link>

            <Link to="/swap-requests">
              <button className="swap-btn">
                Request Swap
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marketplace;