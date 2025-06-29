"use client";
import { useState, useEffect } from "react";
import { useDataContext } from "@component/context/DataProvider";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/mails/custom", {
        method: "POST",
        body: JSON.stringify({
          email: `maxmetadein@gmail.com`,
          title,
          subject,
          body,
        }),
      });
      if (response.ok) {
        toast.success("Email sent successfully! We will get back to you soon. (check your email or spam folder for a reply.)", );
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-8">Contact Us </h2>

      <form onSubmit={handleSendEmail}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            placeholder="Enter your email address"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="subject">
            Email Subject
          </label>
          <input
            id="subject"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            placeholder="Enter email subject"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Email Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter email title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="body">
            Email Body
          </label>
          <textarea
            id="body"
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="6"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            placeholder="Enter your message here"
          ></textarea>
        </div>

        <button
          type="submit"
          className={`w-full p-2 text-white rounded-md ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Email"}
        </button>
      </form>
    </div>
  );
};
export default ContactUs;
