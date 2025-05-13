/*
import { useParams, Link } from "react-router-dom";
import events from "../events.json";

function EventPage() {
  const { id } = useParams();
  const event = events.find((e) => e.id === parseInt(id));

  if (!event) {
    return (
      <div className="container mt-4">
        <p>Event not found</p>
        <Link to="/" className="btn btn-secondary mt-3">
          ← Back to Events
        </Link>
      </div>
    );
  }
  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>{event.location}</p>
      <p>{event.link}</p>

      <Link to="/" className="btn btn-secondary mt-3">
        ← Back to Events
      </Link>
    </div>
  );
}

export default EventPage;
 */
