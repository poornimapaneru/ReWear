import { useParams } from "react-router-dom";
import "./ItemDetails.css";
import { useEffect, useState } from "react";
import API from "../services/api";

function ItemDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [categoryAverage, setCategoryAverage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get("/clothing");

        const allProducts = response.data;

        const selectedProduct = allProducts.find(
          (item) => item._id === id
        );

        setProduct(selectedProduct);

        if (selectedProduct) {
          const sameCategoryItems = allProducts.filter(
            (item) =>
              item.category?.toLowerCase() ===
                selectedProduct.category?.toLowerCase() &&
              item.status !== "Swapped"
          );

          if (sameCategoryItems.length > 0) {
            const totalValue = sameCategoryItems.reduce(
              (sum, item) => sum + Number(item.swapValue || 0),
              0
            );

            const average =
              totalValue / sameCategoryItems.length;

            setCategoryAverage(Math.round(average));
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const loggedInUserId = localStorage.getItem("userId");

  const handleSwapRequest = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/swap",
        {
          clothing: product._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Swap request sent successfully!");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to send swap request."
      );
    }
  };

  const getValueComparison = () => {
    if (categoryAverage === null) {
      return "Not enough data for comparison.";
    }

    const itemValue = Number(product.swapValue || 0);

    if (itemValue > categoryAverage) {
      return "This item has a higher swap value than the category average.";
    }

    if (itemValue < categoryAverage) {
      return "This item has a lower swap value than the category average.";
    }

    return "This item has a swap value close to the category average.";
  };

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="item-details">
      <div className="item-image">
        <img
          src={
            product.image
              ? product.image
              : "https://via.placeholder.com/400x400?text=No+Image"
          }
          alt={product.title}
        />
      </div>

      <div className="item-info">
        <h1>{product.title}</h1>

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
          <strong>Swap Value:</strong>{" "}
          {product.swapValue} Points
        </p>

        {categoryAverage !== null && (
          <div className="value-comparison">
            <p>
              <strong>Category Average:</strong>{" "}
              {categoryAverage} Points
            </p>

            <p>
              <strong>Value Comparison:</strong>{" "}
              {getValueComparison()}
            </p>
          </div>
        )}

        <p>
          <strong>Owner:</strong> {product.owner?.name}
        </p>

        <p>
          <strong>Location:</strong> {product.location}
        </p>

        <p>
          <strong>Description:</strong>
        </p>

        <p>{product.description}</p>

        {product.owner?._id !== loggedInUserId &&
          product.status !== "Swapped" && (
            <button
              className="swap-btn"
              onClick={handleSwapRequest}
            >
              Request Swap
            </button>
          )}
      </div>
    </div>
  );
}

export default ItemDetails;