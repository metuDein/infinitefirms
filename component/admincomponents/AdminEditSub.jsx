"use client";
import { useState } from "react";
import { useDataContext } from "@component/context/DataProvider";

import { toast } from "react-toastify";

const AdminEditSub = ({ params }) => {
  const { id } = params;
  const { allSubscription } = useDataContext();

  const sub = allSubscription.find((item) => item._id === id);

  const [formData, setFormData] = useState({
    instruments: sub?.instruments || "",
    duration: sub?.duration || "",
    price: sub?.price || "",
    earning: sub?.earning || "",
    status: sub?.status || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit the form data to your API or backend
    try {
      const response = await fetch(`/api/subscribe`, {
        method: "PATCH",
        body: JSON.stringify({
          status: formData.status,
          transId: sub?.transId?._id,
          earning: formData.earning,
        }),
      });
      if (response.ok) {
        toast.success("Subscription updated successfully!");
      } else {
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-100 rounded-md shadow-md max-w-3xl mx-auto"
      style={{
        paddingTop: "17px",
      }}
    >
      <div className="mb-4">
        <p className="font-semibold text-black ">
          User : {sub?.userId?.firstname}
        </p>
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="instruments"
        >
          Instruments
        </label>
        <input
          type="text"
          id="instruments"
          name="instruments"
          value={formData.instruments}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter instrument type"
          readOnly
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="duration"
        >
          Duration (Days)
        </label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter duration"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="price"
        >
          Price ($)
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter price"
          readOnly
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="earning"
        >
          Earning (for mining enter in the crypto format for trading enter in
          USD ):
        </label>
        <input
          type="number"
          id="earning"
          name="earning"
          value={formData.earning}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter expected earning"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="status"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="inactive">Inactive</option>
          <option value="active">Active</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Save Changes
      </button>
    </form>
  );
};

export default AdminEditSub;
