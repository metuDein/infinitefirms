"use client";
import { useDataContext } from "@component/context/DataProvider";
import { useState } from "react";
import { toast } from "react-toastify";

const AdminKyc = ({ params }) => {
  const { kycs } = useDataContext();
  const kyc = kycs.find((item) => item._id === params.id);
  const [status, setStatus] = useState(kyc?.status || "pending");
  const [message, setMessage] = useState(kyc?.message || "");

  const handleApprove = async () => {
    try {
      const response = await fetch("/api/kyc", {
        method: "PATCH",
        body: JSON.stringify({ status: "approved", id: params.id }),
      });
      if (response.ok) {
        toast.success("KYC request has been approved.");
      }
    } catch (error) {
      toast.error("Failed to approve KYC request.");
    }
  };
  const handleReject = async () => {
    try {
      const response = await fetch("/api/kyc", {
        method: "PATCH",
        body: JSON.stringify({ status: "rejected", id: params.id }),
      });
      if (response.ok) {
        toast.success("KYC request has been rejected.");
      }
    } catch (error) {
      toast.error("Failed to reject KYC request.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">KYC Approval</h2>

      <div className="mb-4">
        <h3 className="text-md font-semibold">Selfie</h3>
        <img
          src={kyc?.idSelfie?.secure_url}
          alt="Selfie"
          className="w-32 h-32 object-cover rounded-md"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-md font-semibold">ID Document (Front)</h3>
        <img
          src={kyc?.idDoc?.front?.secure_url}
          alt="ID Front"
          className="w-32 h-32 object-cover rounded-md"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-md font-semibold">ID Document (Back)</h3>
        <img
          src={kyc?.idDoc?.back?.secure_url}
          alt="ID Back"
          className="w-32 h-32 object-cover rounded-md"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-md font-semibold">Proof of Address</h3>
        <img
          src={kyc?.addressProof?.secure_url}
          alt="Address Proof"
          className="w-32 h-32 object-cover rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Status: {status}
        </label>
      </div>

      {kyc?.status === "pending" && (
        <>
          <button
            onClick={handleApprove}
            className="w-full bg-green-500 text-white px-4 py-2 rounded-md"
            disabled={status === "approved"}
          >
            Approve KYC
          </button>
          <button
            onClick={handleReject}
            className="w-full bg-red-600 text-white px-4 py-2 rounded-md mt-2"
            disabled={status === "approved"}
          >
            Reject KYC
          </button>
        </>
      )}
      {kyc?.status !== "pending" && (
        <>
          <p className="text-bold text-xl text-black">
            you have already {kyc?.status} this request
          </p>
        </>
      )}
    </div>
  );
};

export default AdminKyc;
