import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditClothing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    brand: "",
    size: "",
    condition: "",
    description: "",
    swapValue: "",
    location: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);

  // Calculate suggested swap value
  const calculateSwapValue = () => {
    let value = 20;

    // Category value
    const category = formData.category.toLowerCase();

    if (category.includes("jacket") || category.includes("coat")) {
      value += 30;
    } else if (
      category.includes("dress") ||
      category.includes("hoodie")
    ) {
      value += 25;
    } else if (
      category.includes("shirt") ||
      category.includes("t-shirt") ||
      category.includes("top")
    ) {
      value += 15;
    } else if (
      category.includes("jeans") ||
      category.includes("trouser") ||
      category.includes("pants")
    ) {
      value += 20;
    }

    // Brand value
    const brand = formData.brand.toLowerCase();

    if (
      brand.includes("zara") ||
      brand.includes("nike") ||
      brand.includes("adidas") ||
      brand.includes("levi")
    ) {
      value += 20;
    } else if (brand.trim() !== "") {
      value += 10;
    }

    // Condition value
    const condition = formData.condition.toLowerCase();

    if (
      condition.includes("excellent") ||
      condition.includes("new")
    ) {
      value += 25;
    } else if (condition.includes("good")) {
      value += 15;
    } else if (condition.includes("fair")) {
      value += 5;
    }

    return value;
  };

  useEffect(() => {
    const fetchClothing = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await API.get(`/clothing/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const item = response.data;

        setFormData({
          title: item.title || "",
          category: item.category || "",
          brand: item.brand || "",
          size: item.size || "",
          condition: item.condition || "",
          description: item.description || "",
          swapValue: item.swapValue || "",
          location: item.location || "",
          image: item.image || "",
        });
      } catch (error) {
        console.error("Error fetching clothing:", error);

        alert(
          error.response?.data?.message ||
            "Unable to load clothing listing."
        );

        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchClothing();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCalculate = () => {
    const calculatedValue = calculateSwapValue();

    setFormData({
      ...formData,
      swapValue: calculatedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/clothing/${id}`,
        {
          ...formData,
          swapValue: Number(formData.swapValue),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Clothing listing updated successfully!");

      navigate("/dashboard");
    } catch (error) {
      console.error("Update Error:", error);

      alert(
        error.response?.data?.message ||
          "Error updating clothing listing."
      );
    }
  };

  if (loading) {
    return <p>Loading clothing details...</p>;
  }

  return (
    <div className="add-clothing">
      <h1>Edit Clothing</h1>
      <p>Update your clothing listing details.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Clothing Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="size"
          placeholder="Size"
          value={formData.size}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="condition"
          placeholder="Condition"
          value={formData.condition}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="swapValue"
          placeholder="Swap Value"
          value={formData.swapValue}
          onChange={handleChange}
          required
        />

        <button
          type="button"
          onClick={handleCalculate}
        >
          Calculate Suggested Swap Value
        </button>

        {formData.swapValue && (
          <p>
            <strong>Suggested Swap Value:</strong>{" "}
            {formData.swapValue} Points
          </p>
        )}

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <button type="submit">
          Update Clothing
        </button>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditClothing;