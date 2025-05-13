import React from "react";
import { Link } from "react-router-dom";

function EventCard({ event }) {
  const handleShare = async () => {
    const eventUrl = `${window.location.origin}/event/${event.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: eventUrl,
        });
        console.log("Event shared successfully");
      } catch (error) {
        console.error("Error sharing event:", error);
        // Fallback to clipboard copy if Web Share API fails or is cancelled
        copyToClipboard(eventUrl);
      }
    } else {
      // Fallback for browsers that do not support Web Share API
      copyToClipboard(eventUrl);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Event link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy event link: ", err);
        alert("Failed to copy event link.");
      });
  };

  // Placeholder image if event.image is not provided
  const eventImage =
    event.image || "https://via.placeholder.com/300x200.png?text=Event+Image";

  return (
    <div className="card h-100">
      <img
        src={eventImage}
        className="card-img-top"
        alt={event.title}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{event.title}</h5>
        <p className="card-text flex-grow-1">
          {event.description.substring(0, 100)}
          {event.description.length > 100 ? "..." : ""}
        </p>
        <p className="card-text">
          <small className="text-muted">
            {event.category} | {event.date} at {event.location}
          </small>
        </p>
        <div className="mt-auto">
          <button onClick={handleShare} className="btn btn-outline-success">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
