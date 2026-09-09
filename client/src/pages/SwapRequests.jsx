import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SwapRequests.css";
import API from "../services/api";

function SwapRequests() {
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Fetch Outgoing Requests
        const outgoingResponse = await API.get("/swap/outgoing", {
          headers,
        });

        setOutgoingRequests(outgoingResponse.data);

        // Fetch Incoming Requests
        const incomingResponse = await API.get("/swap/incoming", {
          headers,
        });

        setIncomingRequests(incomingResponse.data);
      } catch (error) {
        console.error("Error fetching swap requests:", error);
      }
    };

    fetchRequests();
  }, []);

  // Accept Request
  const handleAccept = async (requestId) => {
    try {
      const token = localStorage.getItem("token");

      await API.patch(
        `/swap/accept/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIncomingRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId
            ? { ...request, status: "Accepted" }
            : request
        )
      );

      alert("Swap request accepted successfully!");
    } catch (error) {
      console.error("Error accepting swap request:", error);

      alert(
        error.response?.data?.message ||
          "Failed to accept swap request."
      );
    }
  };

  // Reject Request
  const handleReject = async (requestId) => {
    try {
      const token = localStorage.getItem("token");

      await API.patch(
        `/swap/reject/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIncomingRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId
            ? { ...request, status: "Rejected" }
            : request
        )
      );

      alert("Swap request rejected successfully!");
    } catch (error) {
      console.error("Error rejecting swap request:", error);

      alert(
        error.response?.data?.message ||
          "Failed to reject swap request."
      );
    }
  };

  // Cancel Outgoing Request
  const handleCancel = async (requestId) => {
    try {
      const token = localStorage.getItem("token");

      await API.patch(
        `/swap/cancel/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOutgoingRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId
            ? { ...request, status: "Rejected" }
            : request
        )
      );

      alert("Swap request cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling swap request:", error);

      alert(
        error.response?.data?.message ||
          "Failed to cancel swap request."
      );
    }
  };

  // Open Chat
  const handleOpenChat = (requestId) => {
    navigate(`/chat/${requestId}`);
  };

  return (
    <div className="swap-container">
      <h1>My Swap Requests</h1>

      {/* Incoming Requests */}
      <section>
        <h2>Incoming Requests</h2>

        {incomingRequests.length === 0 ? (
          <p>No incoming swap requests found.</p>
        ) : (
          incomingRequests.map((request) => (
            <div className="swap-card" key={request._id}>
              <img
                src={
                  request.clothing?.image
                    ? `http://localhost:5000${request.clothing.image}`
                    : "https://via.placeholder.com/300x300?text=No+Image"
                }
                alt={request.clothing?.title}
              />

              <div className="swap-details">
                <h2>{request.clothing?.title}</h2>

                <p>
                  <strong>Requester:</strong>{" "}
                  {request.requester?.name}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {request.clothing?.location}
                </p>

                <p>
                  <strong>Swap Value:</strong>{" "}
                  {request.clothing?.swapValue} Points
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      request.status === "Pending"
                        ? "pending"
                        : request.status === "Accepted"
                        ? "accepted"
                        : "rejected"
                    }
                  >
                    {request.status}
                  </span>
                </p>

                {request.status === "Pending" && (
                  <div className="swap-buttons">
                    <button
                      className="accept-btn"
                      onClick={() => handleAccept(request._id)}
                    >
                      Accept
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() => handleReject(request._id)}
                    >
                      Reject
                    </button>
                  </div>
                )}

                {request.status === "Accepted" && (
                  <div className="swap-buttons">
                    <button
                      className="chat-btn"
                      onClick={() => handleOpenChat(request._id)}
                    >
                      Open Chat
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </section>

      {/* Outgoing Requests */}
      <section>
        <h2>Outgoing Requests</h2>

        {outgoingRequests.length === 0 ? (
          <p>No outgoing swap requests found.</p>
        ) : (
          outgoingRequests.map((request) => (
            <div className="swap-card" key={request._id}>
              <img
                src={
                  request.clothing?.image
                    ? `http://localhost:5000${request.clothing.image}`
                    : "https://via.placeholder.com/300x300?text=No+Image"
                }
                alt={request.clothing?.title}
              />

              <div className="swap-details">
                <h2>{request.clothing?.title}</h2>

                <p>
                  <strong>Owner:</strong>{" "}
                  {request.owner?.name}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {request.clothing?.location}
                </p>

                <p>
                  <strong>Swap Value:</strong>{" "}
                  {request.clothing?.swapValue} Points
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      request.status === "Pending"
                        ? "pending"
                        : request.status === "Accepted"
                        ? "accepted"
                        : "rejected"
                    }
                  >
                    {request.status}
                  </span>
                </p>

                {request.status === "Pending" && (
                  <div className="swap-buttons">
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancel(request._id)}
                    >
                      Cancel Request
                    </button>
                  </div>
                )}

                {request.status === "Accepted" && (
                  <div className="swap-buttons">
                    <button
                      className="chat-btn"
                      onClick={() => handleOpenChat(request._id)}
                    >
                      Open Chat
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default SwapRequests;