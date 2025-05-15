import { useState } from "react";
import AuthStore from "../actions";
import { useParams, useNavigate } from "react-router-dom";

const ApplyJob = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [resume, setResume] = useState(null);
  const { applyJob } = AuthStore();
  const { jobId } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    applyJob({ jobId, ...formData, resume });
    navigate("/jobs");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 m-4 bg-gray-100 rounded-lg shadow-md text-gray-700"
    >
      <div className="mb-6">
        <label
          className="block mb-2 font-bold text-gray-700"
          htmlFor="firstName"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          required
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:border-green-500 focus:outline-none"
        />
      </div>
      <div className="mb-6">
        <label
          className="block mb-2 font-bold text-gray-700"
          htmlFor="lastName"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:border-green-500 focus:outline-none"
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-bold text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          required
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:border-green-500 focus:outline-none"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-bold text-gray-700" htmlFor="resume">
          Resume
        </label>
        <input
          type="file"
          id="resume"
          name="resume"
          accept="application/pdf"
          required
          onChange={handleResumeChange}
          className="w-full p-3 border border-gray-300 rounded focus:border-green-500 focus:outline-none"
        />
        {resume && (
          <div className="mt-2 text-gray-700">
            Selected file:
            <span className="text-red-400 mx-2">{resume.name}</span>{" "}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="inline-block px-6 py-3 bg-green-500 text-white rounded hover:bg-green-700 transition-colors duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default ApplyJob;
