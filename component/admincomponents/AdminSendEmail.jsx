"use client";
import { useState, useEffect } from "react";
import { useDataContext } from "@component/context/DataProvider";
import { toast } from "react-toastify";

const AdminSendEmail = () => {
  const { allUsers } = useDataContext();
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
          email: selectedUser,
          title,
          subject,
          body,
        }),
      });
      if (response.ok) {
        toast.success("Email sent successfully!");
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
      <h2 className="text-2xl font-bold mb-6">Send Email to User</h2>

      <form onSubmit={handleSendEmail}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="user">
            Select User
          </label>
          <select
            id="user"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
          >
            <option value="">-- Select User --</option>
            {allUsers.map((user) => (
              <option key={user._id} value={user.email}>
                {user.username || user.email} ({user.email})
              </option>
            ))}
          </select>
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
export default AdminSendEmail;
