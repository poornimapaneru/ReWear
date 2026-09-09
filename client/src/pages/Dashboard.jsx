import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [myListings, setMyListings] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      // User Profile
      const profileResponse = await API.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(profileResponse.data);

      // My Listings
      const response = await API.get("/clothing/my-listings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMyListings(response.data);

      // Incoming Swap Requests
      const incomingResponse = await API.get("/swap/incoming", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIncomingRequests(incomingResponse.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.patch(
        `/swap/accept/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Swap request accepted!");

      fetchDashboardData();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Error accepting request."
      );
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.patch(
        `/swap/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Swap request rejected!");

      fetchDashboardData();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Error rejecting request."
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this clothing listing?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/clothing/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Clothing listing deleted successfully!");

      fetchDashboardData();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Error deleting clothing listing."
      );
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>User Dashboard</h1>
        <p>
          Manage your profile, clothing listings and swap
          activity.
        </p>
      </div>

      <div className="profile-card">
        <h2>My Profile</h2>

        {profile ? (
          <>
            <p>
              <strong>Name:</strong> {profile.name}
            </p>

            <p>
              <strong>Email:</strong> {profile.email}
            </p>

            <p>
              <strong>Role:</strong> {profile.role}
            </p>

            <p>
              <strong>Member Since:</strong>{" "}
              {new Date(
                profile.createdAt
              ).toLocaleDateString()}
            </p>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>

      <div className="listings-section">
        <h2>My Listings</h2>

        {myListings.length === 0 ? (
          <p>No listings found.</p>
        ) : (
          myListings.map((item) => (
            <div
              className="listing-card"
              key={item._id}
            >
              <h3>{item.title}</h3>

              <p>Status: {item.status}</p>

              <button
                onClick={() =>
                  navigate(`/edit-clothing/${item._id}`)
                }
              >
                Edit
              </button>

              <button
                onClick={() =>
                  handleDelete(item._id)
                }
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div className="incoming-section">
        <h2>Incoming Swap Requests</h2>

        {incomingRequests.length === 0 ? (
          <p>No incoming requests.</p>
        ) : (
          incomingRequests.map((request) => (
            <div
              className="listing-card"
              key={request._id}
            >
              <h3>
                {request.clothing
                  ? request.clothing.title
                  : "Clothing item no longer available"}
              </h3>

              <p>
                <strong>Requester:</strong>{" "}
                {request.requester?.name || "Unknown user"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {request.status}
              </p>

              {request.status === "Pending" &&
                request.clothing && (
                  <>
                    <button
                      onClick={() =>
                        handleAccept(request._id)
                      }
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        handleReject(request._id)
                      }
                    >
                      Reject
                    </button>
                  </>
                )}
            </div>
          ))
        )}
      </div>

      <div className="stats-section">
        <h2>Swap Statistics</h2>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>{myListings.length}</h3>
            <p>Total Listings</p>
          </div>

          <div className="stat-card">
            <h3>{incomingRequests.length}</h3>
            <p>Pending Requests</p>
          </div>

          <div className="stat-card">
            <h3>
              {
                myListings.filter(
                  (item) =>
                    item.status === "Swapped"
                ).length
              }
            </h3>

            <p>Successful Swaps</p>
          </div>
        </div>
      </div>

      <div className="actions-section">
        <h2>Quick Actions</h2>

        <button
          onClick={() =>
            navigate("/add-clothing")
          }
        >
          Add New Listing
        </button>

        <button
          onClick={() =>
            navigate("/marketplace")
          }
        >
          Browse Marketplace
        </button>

        <button
          onClick={() =>
            navigate("/profile")
          }
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Dashboard;