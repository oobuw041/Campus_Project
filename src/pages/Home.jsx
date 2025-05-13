import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard"; // Adjusted path

function Home() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/Campus_Project/events.json") // use the repo name as base
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Failed to load events:", err));
  }, []);

  useEffect(() => {
    // Add a placeholder image URL if not present and extract categories
    const processedEvents = eventsData.map((event) => ({
      ...event,
      image: event.image || `https://picsum.photos/seed/${event.id}/300/200`,
    }));
    setEvents(processedEvents);

    // Extract unique categories from events
    const uniqueCategories = [
      ...new Set(eventsData.map((event) => event.category)),
    ];
    setCategories(uniqueCategories);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory
      ? event.category === selectedCategory
      : true;
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mt-4">
      <h1 className="my-4 text-center">Campus Events</h1>

      {/* Search Bar */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search events by name or description (e.g., Hackathon, Mental Health)"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="row mb-4 justify-content-center">
        <div className="col-auto">
          <button
            onClick={() => handleCategoryChange("")}
            className={`btn ${
              selectedCategory === "" ? "btn-primary" : "btn-outline-primary"
            } me-2 mb-2`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`btn ${
                selectedCategory === category
                  ? "btn-primary"
                  : "btn-outline-primary"
              } me-2 mb-2`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Event Cards */}
      {filteredEvents.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredEvents.map((event) => (
            <div className="col" key={event.id}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">
          No events found matching your criteria. Try adjusting your search or
          filters.
        </p>
      )}
    </div>
  );
}

export default Home;
