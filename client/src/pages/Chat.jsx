import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";

function Chat() {
  const { swapRequestId } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const token = localStorage.getItem("token");

  // Get current user's ID from JWT
  const getUserIdFromToken = () => {
    try {
      if (!token) return null;

      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  const currentUserId = getUserIdFromToken();

  // Fetch messages
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/messages/${swapRequestId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessages(data);
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load messages when page opens
  useEffect(() => {
    fetchMessages();
  }, [swapRequestId]);

  // Send message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      setSending(true);

      const response = await fetch(
        "http://localhost:5000/api/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            swapRequestId,
            message: newMessage.trim(),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setNewMessage("");

        // Fetch complete conversation again
        await fetchMessages();
      } else {
        console.error(data);
        alert(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Something went wrong while sending the message.");
    } finally {
      setSending(false);
    }
  };

  // Send message using Enter key
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">

      <div className="chat-header">
        <h1>Swap Negotiation Chat</h1>
        <p>
          Discuss your clothing swap before confirming the exchange.
        </p>
      </div>

      <div className="chat-box">

        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p>No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg) => {
            const senderId =
              typeof msg.sender === "object"
                ? msg.sender._id
                : msg.sender;

            const isSent = senderId === currentUserId;

            const senderName =
              typeof msg.sender === "object" && msg.sender?.name
                ? msg.sender.name
                : isSent
                ? "You"
                : "User";

            return (
              <div
                key={msg._id}
                className={`message ${
                  isSent ? "sent" : "received"
                }`}
              >
                <strong className="sender-name">
                  {senderName}
                </strong>

                <p>{msg.message}</p>
              </div>
            );
          })
        )}

      </div>

      <div className="chat-input">

        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={sending}
        />

        <button
          onClick={handleSendMessage}
          disabled={sending || !newMessage.trim()}
        >
          {sending ? "Sending..." : "Send"}
        </button>

      </div>

    </div>
  );
}

export default Chat;