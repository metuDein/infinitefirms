"use client";
import { useState, useEffect } from "react";
import { useDataContext } from "@component/context/DataProvider";
import { toast } from "react-toastify";
import Rating from "@component/homepagecomponents/testimonials/components/Rating";

const AdminTestimonial = () => {
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        body: JSON.stringify({
          rating,
          name: username,
          comment,
        }),
      });
      if (response.ok) {
        toast.success("Testimonial successfully added!");
      }
    } catch (error) {
      console.error("Error from testimonial:", error.message);
      toast.error("Failed to send testimonial");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add a new testimonial</h2>

      <form onSubmit={handleSendEmail}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Enter name manually
          </label>
          <input
            id="name"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="comment">
            Comment
          </label>
          <textarea
            id="comment"
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="6"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>
        <Rating rating={rating} setRating={setRating} />

        <button
          type="submit"
          className={`w-full p-2 text-white rounded-md ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Add Testimonial"}
        </button>
      </form>
    </div>
  );
};
export default AdminTestimonial;
