import { useState } from "react";
import API from "../services/api";

function AddClothing() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    brand: "",
    size: "",
    condition: "",
    description: "",
    swapValue: "",
    location: "",
    image: null,
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
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

      const data = new FormData();

      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("brand", formData.brand);
      data.append("size", formData.size);
      data.append("condition", formData.condition);
      data.append("description", formData.description);
      data.append("swapValue", Number(formData.swapValue));
      data.append("location", formData.location);
      data.append("image", formData.image);

      await API.post("/clothing/add", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Clothing added successfully!");

      setFormData({
        title: "",
        category: "",
        brand: "",
        size: "",
        condition: "",
        description: "",
        swapValue: "",
        location: "",
        image: null,
      });
    } catch (error) {
      console.error(error.response?.data);

      alert(
        error.response?.data?.message ||
          JSON.stringify(error.response?.data) ||
          "Error adding clothing"
      );
    }
  };

  return (
    <div className="add-clothing">
      <h1>Add Clothing</h1>
      <p>Upload a new clothing item here.</p>

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
          placeholder="Category (e.g. Jacket, Hoodie, Jeans)"
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
          placeholder="Condition (e.g. Excellent, Good, Fair)"
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

        <button type="button" onClick={handleCalculate}>
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
          type="file"
          name="image"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleImageChange}
          required
        />

        <button type="submit">
          Add Clothing
        </button>
      </form>
    </div>
  );
}

export default AddClothing;