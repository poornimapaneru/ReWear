import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [swaps, setSwaps] = useState([]);
  const [disputes, setDisputes] = useState([]);

  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalListings: 0,
    totalSwapRequests: 0,
    successfulSwaps: 0,
    pendingSwaps: 0,
    rejectedSwaps: 0,
  });

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  };

  const fetchListings = async () => {
    try {
      const res = await API.get("/admin/listings");
      setListings(res.data);
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to fetch listings"
      );
    }
  };

  const fetchSwaps = async () => {
    try {
      const res = await API.get("/admin/swaps");
      setSwaps(res.data);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to fetch swap activities"
      );
    }
  };

  const fetchDisputes = async () => {
    try {
      const res = await API.get("/admin/disputes");
      setDisputes(res.data);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to fetch disputes"
      );
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await API.get("/admin/analytics");
      setAnalytics(res.data);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to fetch analytics"
      );
    }
  };

  const handleDeleteListing = async (id) => {
    try {
      const res = await API.delete(`/admin/listings/${id}`);

      alert(res.data.message);

      fetchListings();
      fetchAnalytics();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete listing"
      );
    }
  };

  const handleResolveDispute = async (id) => {
    const adminNote = prompt(
      "Enter resolution note:"
    );

    if (adminNote === null) {
      return;
    }

    try {
      const res = await API.patch(
        `/admin/disputes/${id}/resolve`,
        {
          adminNote,
        }
      );

      alert(res.data.message);

      fetchDisputes();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to resolve dispute"
      );
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchListings();
    fetchSwaps();
    fetchDisputes();
    fetchAnalytics();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <p>
        Manage users, clothing listings, disputes, and platform
        analytics.
      </p>

      {/* Analytics */}
      <h2>Platform Analytics</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            minWidth: "150px",
          }}
        >
          <h3>Total Users</h3>
          <p>{analytics.totalUsers}</p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            minWidth: "150px",
          }}
        >
          <h3>Total Listings</h3>
          <p>{analytics.totalListings}</p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            minWidth: "150px",
          }}
        >
          <h3>Total Swap Requests</h3>
          <p>{analytics.totalSwapRequests}</p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            minWidth: "150px",
          }}
        >
          <h3>Successful Swaps</h3>
          <p>{analytics.successfulSwaps}</p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            minWidth: "150px",
          }}
        >
          <h3>Pending Swaps</h3>
          <p>{analytics.pendingSwaps}</p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            minWidth: "150px",
          }}
        >
          <h3>Rejected Swaps</h3>
          <p>{analytics.rejectedSwaps}</p>
        </div>
      </div>

      <h2>Users</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div>
          {users.map((user) => (
            <div
              key={user._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <p>
                <strong>Name:</strong> {user.name}
              </p>

              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <p>
                <strong>Role:</strong> {user.role}
              </p>
            </div>
          ))}
        </div>
      )}

      <h2>Clothing Listings</h2>

      {listings.length === 0 ? (
        <p>No clothing listings found.</p>
      ) : (
        <div>
          {listings.map((listing) => (
            <div
              key={listing._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <p>
                <strong>Title:</strong> {listing.title}
              </p>

              <p>
                <strong>Category:</strong> {listing.category}
              </p>

              <p>
                <strong>Size:</strong> {listing.size}
              </p>

              <p>
                <strong>Condition:</strong> {listing.condition}
              </p>

              <p>
                <strong>Swap Value:</strong>{" "}
                {listing.swapValue}
              </p>

              <p>
                <strong>Owner:</strong>{" "}
                {listing.owner?.name || "Unknown"}
              </p>

              <button
                onClick={() =>
                  handleDeleteListing(listing._id)
                }
                style={{
                  marginTop: "10px",
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
              >
                Delete Listing
              </button>
            </div>
          ))}
        </div>
      )}

      <h2>Swap Activities</h2>

      {swaps.length === 0 ? (
        <p>No swap activities found.</p>
      ) : (
        <div>
          {swaps.map((swap) => (
            <div
              key={swap._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <p>
                <strong>Requester:</strong>{" "}
                {swap.requester?.name || "Unknown"}
              </p>

              <p>
                <strong>Owner:</strong>{" "}
                {swap.owner?.name || "Unknown"}
              </p>

              <p>
                <strong>Clothing:</strong>{" "}
                {swap.clothing?.title ||
                  "Listing unavailable"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {swap.status}
              </p>

              <p>
                <strong>Request ID:</strong>{" "}
                {swap._id}
              </p>
            </div>
          ))}
        </div>
      )}

      <h2>Disputes</h2>

      {disputes.length === 0 ? (
        <p>No disputes found.</p>
      ) : (
        <div>
          {disputes.map((dispute) => (
            <div
              key={dispute._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <p>
                <strong>Requester:</strong>{" "}
                {dispute.requester?.name ||
                  "Unknown"}
              </p>

              <p>
                <strong>Owner:</strong>{" "}
                {dispute.owner?.name || "Unknown"}
              </p>

              <p>
                <strong>Clothing:</strong>{" "}
                {dispute.clothing?.title ||
                  "Listing unavailable"}
              </p>

              <p>
                <strong>Swap Status:</strong>{" "}
                {dispute.status}
              </p>

              <p>
                <strong>Dispute Status:</strong>{" "}
                {dispute.disputeStatus}
              </p>

              <p>
                <strong>Reason:</strong>{" "}
                {dispute.disputeReason ||
                  "No reason provided"}
              </p>

              {dispute.disputeStatus === "Open" && (
                <button
                  onClick={() =>
                    handleResolveDispute(
                      dispute._id
                    )
                  }
                  style={{
                    marginTop: "10px",
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                >
                  Resolve Dispute
                </button>
              )}

              {dispute.disputeStatus === "Resolved" && (
                <>
                  <p>
                    <strong>Admin Note:</strong>{" "}
                    {dispute.adminNote ||
                      "No note provided"}
                  </p>

                  <p>
                    <strong>Resolved At:</strong>{" "}
                    {dispute.resolvedAt
                      ? new Date(
                          dispute.resolvedAt
                        ).toLocaleString()
                      : "N/A"}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;