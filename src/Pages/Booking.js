import React from "react";

const Booking = () => {
  return (
    <div>
      <h1>Book an Appointment</h1>
      <form>
        <input type="text" placeholder="Your Name" />
        <input type="date" />
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default Booking;
